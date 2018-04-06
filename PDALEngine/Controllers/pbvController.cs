using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PDALEngine.Controllers
{
    public class pbvController : Controller
    {
        //
        // GET: /pbv/

        public ActionResult Index()
        {
            return View();
        }
    
        public ActionResult GetItems(int a)
        {

            int[] r = new int[a];
            for (int k = 0; k < a; k++)
            {
                r[k] = k * 2;

            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }
    }
}
