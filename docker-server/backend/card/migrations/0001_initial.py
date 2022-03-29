# Generated by Django 3.2.12 on 2022-03-29 02:06

import card.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('card_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=500, null=True)),
                ('audio', models.CharField(max_length=200, null=True)),
                ('myvoice', models.FileField(null=True, upload_to=card.models.user_directory_path)),
                ('image', models.ImageField(null=True, upload_to=card.models.user_directory_path)),
                ('video', models.CharField(max_length=200, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('voice_num', models.IntegerField(null=True)),
            ],
        ),
    ]