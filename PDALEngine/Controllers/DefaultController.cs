using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PDALEngine.Controllers
{
    public class DefaultController : Controller
    {
        //
        // GET: /Default/
        dynamic f1(int i)
        {
            switch (i)
            {
                case 1:
                    return 10;
                    break;
                case 2:
                    return new ContentResult();
                    break;
                default:
                    return null;
                    break;
            }
        }
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost()]
        public JsonResult GetItems(int a)
        {
            //int i = f1(10);
            //ContentResult ci = f1(10);

            int[] r = new int[a];
            for (int k = 0; k < a; k++)
            {
                r[k] = k * 2;

            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }
    }
}
