# Generated by Django 4.1.3 on 2022-11-21 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_alter_post_type_alter_post_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(default='', null=True),
        ),
    ]
