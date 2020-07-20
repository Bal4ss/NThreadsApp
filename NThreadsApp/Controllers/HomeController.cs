using System;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using NThreadsApp.Moduls;

namespace NThreadsApp.Controllers
{
    public class HomeController : Controller
    {
        /*Инициализация семафора*/
        private static Semaphore sem = new Semaphore(Config.Nthread, Config.Nthread);
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Contacts()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Check(string str)
        {
            /*закрываем семафор или если нет свободных слотов возвращаем ошибку*/
            if (sem.WaitOne(0) != true) return Json("Ошибка ожидания ответа от сервера");
            Thread.Sleep(1000);//искусственная задержка
            str = str.Replace(" ", "");//убираем пробелы из строки
            bool result = str.Reverse().SequenceEqual(str);//переварачиваем строку и сравниваем с изначальной
            sem.Release();//открываем семафор
            return Json(result);
        }
    }
}