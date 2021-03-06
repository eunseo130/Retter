## 기본 라이브러리 Import
import sys
import numpy as np
import torch
import os
from retter.settings import MODEL_ROOT, MEDIA_URL, MEDIA_ROOT
from pydub import AudioSegment
## WaveGlow 프로젝트 위치 설정
sys.path.append(MODEL_ROOT+'/waveglow/')
## Tacontron2 프로젝트 위치 설정
sys.path.append(MODEL_ROOT+'/tacotron2/')

## 프로젝트 라이브러리 Import
from hparams import defaults
from tacotron2.train import load_model
from text import text_to_sequence
import json
import sys
from waveglow.glow import WaveGlow
from denoiser import Denoiser
import soundfile as sf

## dict->object 변환용
class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)
        
def load_checkpoint(checkpoint_path, model):
    assert os.path.isfile(checkpoint_path)
    checkpoint_dict = torch.load(checkpoint_path, map_location=torch.device('cpu'))
    model_for_loading = checkpoint_dict['model']
    model.load_state_dict(model_for_loading.state_dict())
    return model
        
class Synthesizer:
    def __init__(self, tacotron_check, waveglow_check):
        hparams = Struct(**defaults)
        hparams.n_mel_channels=80
        hparams.sampling_rate = 22050

        self.hparams = hparams

        device = torch.device('cpu')

        model = load_model(hparams)
        model.load_state_dict(torch.load(tacotron_check, map_location=device)['state_dict'])
        model.to(device).eval()#.half()

        
        self.tacotron = model
        
        with open(MODEL_ROOT+'/waveglow/config.json') as f:
            data = f.read()
        config = json.loads(data)
        waveglow_config = config["waveglow_config"]
        
        waveglow = WaveGlow(**waveglow_config)
        waveglow = load_checkpoint(waveglow_check, waveglow)
        waveglow.to(device).eval()
        
        self.denoiser = Denoiser(waveglow)
        self.waveglow = waveglow
        
        
    def inference(self, text):
        assert type(text)==str, "텍스트 하나만 지원합니다."
        sequence = np.array(text_to_sequence(text, ['korean_cleaners']))[None, :]
        sequence = torch.autograd.Variable(torch.from_numpy(sequence)).cpu().long()

        mel_outputs, mel_outputs_postnet, _, alignments = self.tacotron.inference(sequence)
        
        
        with torch.no_grad():
            audio = self.waveglow.infer(mel_outputs_postnet, sigma=0.666)
        audio = audio[0].data.cpu().numpy()
        return audio, self.hparams.sampling_rate
    
    ## \n으로 구성된 여러개의 문장 inference 하는 코드
    def inference_phrase(self, phrase, sep_length=4000):
        texts = phrase.split('\n')
        audios = []
        for text in texts:
            if text == '':
                audios.append(np.array([0]*sep_length))
                continue
            audio, sampling_rate = self.inference(text)
            audios.append(audio)
            audios.append(np.array([0]*sep_length))
        return np.hstack(audios[:-1]), sampling_rate
            
    
    def denoise_inference(self, text, sigma=0.666):
        assert type(text)==str, "텍스트 하나만 지원합니다."
        sequence = np.array(text_to_sequence(text, ['korean_cleaners']))[None, :]
        sequence = torch.autograd.Variable(torch.from_numpy(sequence)).cpu().long()

        mel_outputs, mel_outputs_postnet, _, alignments = self.tacotron.inference(sequence)
               
        with torch.no_grad():
            audio = self.waveglow.infer(mel_outputs_postnet, sigma=0.666)
            
        
        audio_denoised = self.denoiser(audio, strength=0.01)[:, 0].cpu().numpy()
        return audio_denoised.reshape(-1), self.hparams.sampling_rate


def synthesis(text, id, voice_num):
  ## 체크포인트 설정
  voice_num = str(voice_num)
  tacotron2_checkpoint = MODEL_ROOT+'/tacotron2/output/' + voice_num
  waveglow_checkpoint = MODEL_ROOT+'/waveglow/checkpoints/1'

  ## 음성 합성 모듈 생성
  synthesizer = Synthesizer(tacotron2_checkpoint, waveglow_checkpoint)

  ## 문장 생성
  
  audio, sampling_rate = synthesizer.inference(text)
  if os.path.isdir(MEDIA_ROOT + '/' + id ) == False:
    os.mkdir(MEDIA_ROOT + "/" + id)
  ## 음성 저장하기
  sf.write( 'media/'+id +'/'+id + '.wav', audio, sampling_rate)
  def volume_up(audio_dir, dB):
    audio = AudioSegment.from_wav(audio_dir)
    audio = audio + dB
    audio.export(audio_dir, format='wav')
  volume_up('media/'+ id +'/' + id + '.wav', 15)
  
