using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PDALEngine.Controllers
{
    public class utilController : Controller
    {
        //
        // GET: /util/

        public string  Index()
        {
            return "salam";
        }
        public string CreateProc(string id)
        {
            return PDAL.CreateBaseProcForTable(id).Replace("\n","<br />");
        }
        public string CreateMgt(string id)
        {
            return PDAL.mgtAllonce(id);
        }
        public string CreateScallerTableView(string id)
        {
            return PDAL.mgtAllonce(id);
        }
        public string CreateQuick(string id)
        {
            return PDAL.GetQuickSerachProc(id);
        }
        public string CreateOnePageMgt(string id)
        {
            return PDAL.GenPageForSaveOnePageMaster(id);
        }
        //
        // GET: /util/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /util/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /util/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /util/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /util/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /util/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /util/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
