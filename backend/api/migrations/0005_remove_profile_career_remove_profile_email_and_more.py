# Generated by Django 5.1 on 2024-08-23 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_deal_money_alter_deal_profit_alter_profile_age_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='career',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='email',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='phone',
        ),
        migrations.AddField(
            model_name='profile',
            name='about',
            field=models.TextField(blank=True, null=True),
        ),
    ]
