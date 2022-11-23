# Generated by Django 4.1.3 on 2022-11-23 03:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_post_content'),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=128)),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='latitude',
            field=models.FloatField(default=-1),
        ),
        migrations.AddField(
            model_name='city',
            name='longitude',
            field=models.FloatField(default=-1),
        ),
        migrations.AddField(
            model_name='city',
            name='region',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AddField(
            model_name='city',
            name='timezone',
            field=models.CharField(default='Europe/Paris', max_length=64),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AddField(
            model_name='city',
            name='country',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.country'),
        ),
    ]
