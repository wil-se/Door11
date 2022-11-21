# Generated by Django 4.1.3 on 2022-11-21 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_post_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='type',
            field=models.CharField(choices=[('Event', 'Event'), ('Article', 'Article')], default='Event', max_length=32),
        ),
        migrations.AlterField(
            model_name='post',
            name='year',
            field=models.IntegerField(default=2000),
        ),
    ]
