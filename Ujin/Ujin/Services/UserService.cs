﻿using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ujin.Data;
using Ujin.Data.Enums;
using Ujin.Data.Models;
using Ujin.Interfaces;
using Ujin.Models.CallMe;

namespace Ujin.Services
{
    public class UserService: IUserService
    {
        private readonly UjinContext ujinContext;

        private readonly IMailSender mailSender;

        private readonly AppSettings settings;

        public UserService(
            UjinContext ujinContext,
            IMailSender mailSender,
            IOptions<AppSettings> settingsOptions)
        {
            this.ujinContext = ujinContext;
            this.mailSender = mailSender;
            settings = settingsOptions.Value;
        }

        public async Task ProcessCallMeUser(CallMeUser user)
        {
            var efUser = new User
            {
                Name = user.Name,
                Phone = user.Phone,
                CreationSource = UserCreationSource.RequestedCallBack,
                SubscriptionOptions = SubscriptionOption.Viber,
                DateCreated = DateTime.Now
            };

            await Task.WhenAll(SaveUser(efUser), SendMessageAboutUser(efUser));
        }

        private async Task SaveUser(User efUser)
        {
            ujinContext.Users.Add(efUser);
            await ujinContext.SaveChangesAsync();
        }

        private async Task SendMessageAboutUser(User efUser)
        {
            var mail = new SimpleMail
            {
                From = settings.MailSettings.SupportMail,
                Subject = "Новий користувач у Ujin",
                Body = UserToString(efUser),
                To = settings.MailSettings.MailTo.ToList()
            };
            await mailSender.SendMessage(mail);
        }

        private string UserToString(User efUser)
        {
            var builder = new StringBuilder();
            builder.AppendLine("Новий користувач з наступними параметрами: ");
            builder.AppendLine($"Ім'я: {efUser.Name}");
            builder.AppendLine($"Прізвище: {efUser.Surname}");
            builder.AppendLine($"Емейл: {efUser.Email}");
            builder.AppendLine($"Номер телефону: {efUser.Phone}");
            builder.AppendLine($"Причина створення: {efUser.CreationSource.ToString()}");
            builder.AppendLine($"Опції підписки: {efUser.SubscriptionOptions.ToString()}");
            builder.AppendLine($"Дата створення: {efUser.DateCreated}");

            if (efUser.Orders != null && efUser.Orders.Count > 0)
            {
                builder.AppendLine();
                builder.AppendLine("Замовлення: ");
                foreach(var order in efUser.Orders)
                {
                    builder.AppendLine($"Опис замовлення: '{order.Definition}'");
                    builder.AppendLine($"Дата замовлення: '{order.DateCreated}'");
                    builder.AppendLine();
                }
            }

            return builder.ToString();
        }
    }
}
