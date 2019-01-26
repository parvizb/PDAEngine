using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Data.SqlClient;
using System.Data;
using System.Xml;
namespace PDALEngine.Controllers
{
    
    public class ScallerResult
    {
        public int code;
        public string Message;
        public string retrunValue;

    }

    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Login(String Message="")
        {
            ViewBag.Message = Message;
          
            return View();
        }

        public string CustomScaler(string Command, string pageName, inputParameter[] para)
        {

            throw new Exception("پیاده سازی نشده");
        }
        public class DataReturnsObject
        {
            public object[] Records = null;
            public string Message = null;
            public int Status = 0;



        }



        public DataReturnsObject[] CustomRecords(string Command, string pageName, inputParameter[] para)
        {

            throw new Exception("پیاده سازی نشده");
        }
        public ActionResult LogOut()
        {
            Session["UserName"] = null;
            Session["Per"] = null;

            return RedirectToAction("Login");
        }


        [HttpPost]
        public ActionResult Login(string txtUserId, string txtPassword)
        {
            try
            {
                string R="CheckLogin";
                List<inputParameter> Lis=new List<inputParameter>();
                inputParameter p =new inputParameter();
                p.key="UserId";
                p.value=txtUserId;
                Lis.Add(p);
                p =new inputParameter();
                p.key="Password";
                p.value=Convertor.Encrypt(txtPassword,txtPassword);
                Lis.Add(p);


               int r= int.Parse(PDAL.ReadRecords(ref R, Lis).Rows[0][0].ToString());
               if (r == 0)
               {
                   return Login("نام کاربری یا گذرواژه نادرست است");

               }
               else
               {
                   Session["UserName"] = txtUserId;
                   Dictionary<string, string> Per = new Dictionary<string, string>();
                   R = "GetAllPerForUser";
                    Lis = new List<inputParameter>();
                     p = new inputParameter();
                   p.key = "UserId";
                   p.value = txtUserId;
                   Lis.Add(p);
                


                   DataTable Dt= PDAL.ReadRecords(ref R, Lis);
                   foreach (DataRow Dr in Dt.Rows)
                   {
                       Per.Add(Dr["PerKey"].ToString(),"-");

                   }
                   Session["Per"] = Per;
                   return RedirectToAction("Index", "Home");
               }
            }
            catch
            {

                return Login("خطای نامشخص");
            }


        }
        public ActionResult Index()
        {
            DateTime CreateTime = new FileInfo(Server.MapPath("~/PDA.Config")).LastWriteTime;
            bool needToBuildFiles = true;
            if (System.IO.File.Exists(Server.MapPath("~/builded.dat")))
            {
                FileInfo x=new FileInfo(Server.MapPath("~/builded.dat"));
                if (x.LastWriteTime > CreateTime)
                {
                    needToBuildFiles = false;
                }
            }

             
            if (PDAL.loaded == false)
            {
                PDAL.load();

            }
            else
            {
                if (needToBuildFiles == true)
                {

                     
                    PDAL.load();
                }

            }
            if (needToBuildFiles)
            {
              PDAL.BuildApp();
              System.IO.File.WriteAllText(Server.MapPath("~/builded.dat"), ""); 
            }
          
         // nodes = Xml.GetElementsByTagName("xs:element" );
         // for (int k = 0; k < nodes.Count; k++)
         // {
         //
         //     XmlNode att = Xml.CreateElement("xs:annotation"  );
         //     nodes[k].AppendChild(att);
         //     XmlNode doc = Xml.CreateElement("xs:documentation" );
         //     doc.InnerText = "توضیحات";
         //     att.AppendChild(doc);
         //
         // }
         // nodes = Xml.GetElementsByTagName("xs:attribute" );
         // for (int k = 0; k < nodes.Count; k++)
         // {
         //
         //     XmlNode att = Xml.CreateElement("xs:annotation" );
         //     nodes[k].AppendChild(att);
         //     XmlNode doc = Xml.CreateElement("xs:documentation" );
         //     doc.InnerText = "توضیحات";
         //     att.AppendChild(doc);
         //
         // }
       
           try
           {
               SqlConnection Con = PDALEngine.PDAL.GetConnection();
               Con.Close();
           }
           catch(Exception ex)
           {
            return     RedirectToAction("GetErrorAsText",  new {  errMsg="عدم امکان با بانک یا عدم پیکربندی صحیح در فایل PDA.Config : " + ex.Message });
             
           }
     
            ViewBag.App = PDAL.App;
            return View();
        }
       
        public string GetErrorAsText(string errMsg)
        {

            return "<div style='direction:rtl' >" + errMsg+"</div>"; 
        }

        [HttpPost()]
        public JsonResult getStartValueFromServer(string PageName, List<inputParameter> Parameters)
        {
            if (Parameters == null)
            {
                Parameters = new List<inputParameter>();
            }
            ConvertNullToEmpty(Parameters);
            Page Info = PDAL.FindPage(PageName);
            PDALSect.AccessResult DoAccess = PDALSect.GetCheckPer(Info.PerKey, PageName, Parameters);
           //  PDAL.ConvertValues(Info, Parameters);
            ScallerResult Res = new ScallerResult();
            try
            {
                if (DoAccess ==  PDALSect.AccessResult.AccessDenied)
                {
                    Res.code = 403;
                    Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
                    return Json(Res) ;

                }
                if (DoAccess ==  PDALSect.AccessResult.ReLogin)
                {
                    Res.code = 401;
                    Res.Message = "نیاز به ورود مجدد می باشد";
                    return Json(Res);

                }
                Res.code = 0;
                Res.Message = "با موفقیت انجام شد";
                if (Info.ValueDbCommand.StartsWith("$") == false)
                {
                    Res.retrunValue = PDAL.DataTableToJson(PDAL.ReadRecords(ref Info.ValueDbCommand, PDAL.SkipParameters(Info, Parameters)), Res.code, "");
                }
                else
                {
                    Res.retrunValue = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(CustomRecords(Info.ValueDbCommand, Info.name, Parameters.ToArray()));
                }
            }
            catch (SqlException Ex)
            {

                Res.code = 300;
                Res.Message = "خطایی رخ داد:" + Ex.ErrorCode.ToString() + ":" + Ex.Message;

            }
            catch (Exception Ex)
            {
                Res.code = 500;
                Res.Message = "خطایی رخ داد:" + Ex.Message;

            }
            return Json(Res);



        }
        [HttpPost()]
        public JsonResult AjaxAction(string actionName, List<inputParameter> Parameters)
        {
            ConvertNullToEmpty(Parameters);
            action Info = PDAL.actionAccess[actionName];
            PDALSect.AccessResult DoAccess = PDALSect.GetCheckPer(Info.PerKey, actionName, Parameters);
            ScallerResult Res = new ScallerResult();
           
             
             


            try
            {

                if (DoAccess == PDALSect.AccessResult.AccessDenied)
                {
                    Res.code = 403;
                    Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
                    return Json(Res);

                }
                if (DoAccess ==  PDALSect.AccessResult.ReLogin)
                {
                    Res.code = 401;
                    Res.Message = "نیاز به ورود مجدد می باشد";
                    return Json(Res);

                }
                Res.code = 0;
                Res.Message = "با موفقیت انجام شد";
                if (Info.DBCommand.StartsWith("$") == false)
                {
                    Res.retrunValue = PDAL.ExecScaller(ref Info.DBCommand, Parameters);
                }
                else
                {
                    Res.retrunValue = CustomScaler(Info.DBCommand, Info.name, Parameters.ToArray());

                }
            }
            catch (SqlException Ex)
            {

                Res.code = 300;
                Res.Message = "خطایی رخ داد:" + Ex.ErrorCode.ToString() + ":" + Ex.Message;

            }
            catch (Exception Ex)
            {
                Res.code = 500;
                Res.Message = "خطایی رخ داد:" + Ex.Message;

            }
            return Json(Res);



        }
        [HttpPost()]
    
        public JsonResult AjaxActionTable(string actionName, List<inputParameter> Parameters)
        {
            if (Parameters == null)
            {

                Parameters = new List<inputParameter>();
            }
            ConvertNullToEmpty(Parameters);
            action Info = PDAL.actionAccess[actionName];
             PDALSect.AccessResult DoAccess = PDALSect.GetCheckPer(Info.PerKey, actionName, Parameters);
            ScallerResult Res = new ScallerResult();





            try
            {

                if (DoAccess ==  PDALSect.AccessResult.AccessDenied)
                {
                    Res.code = 403;
                    Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
                    return Json(Res);

                }
                if (DoAccess ==  PDALSect.AccessResult.ReLogin)
                {
                    Res.code = 401;
                    Res.Message = "نیاز به ورود مجدد می باشد";
                    return Json(Res);

                }
                Res.code = 0;
                Res.Message = "با موفقیت انجام شد";
                if (Info.DBCommand.StartsWith("#") == false)
                {

                    Res.retrunValue = PDAL.DataTableToJson(PDAL.ReadRecords(ref Info.DBCommand, Parameters), 0, "");

                }
                else
                {
                    Res.retrunValue = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(CustomRecords(Info.DBCommand, "!AjaxActions", Parameters.ToArray()));

                }
            }
            catch (SqlException Ex)
            {

                Res.code = 300;
                Res.Message = "خطایی رخ داد:" + Ex.ErrorCode.ToString() + ":" + Ex.Message;

            }
            catch (Exception Ex)
            {
                Res.code = 500;
                Res.Message = "خطایی رخ داد:" + Ex.Message;

            }
            return Json(Res);



        }
        [HttpPost()]
        public JsonResult getDBSelect2DirectValue(string PageName, string PageParameterName, string value)
        {
            Page P = PDAL.FindPage(PageName);
            PageParameter PP = P.DicPageParameters[PageParameterName];
            inputParameter ip = new inputParameter();
            ip.key = PP.DBSelect2CommandDriectValueParameterName;
            ip.value = value;
            List<inputParameter> px = new List<inputParameter>();
            inputParameter res = new inputParameter();
            res.key = "result";

            px.Add(ip);
            try
            {
                if (PP.DBSelect2CommandDriectValue.StartsWith("$") == false)
                {
                    res.value = PDAL.ExecScaller(ref PP.DBSelect2CommandDriectValue, px);
                }
                else
                {
                    res.value = CustomScaler(PP.DBSelect2CommandDriectValue, "!DirectValue", px.ToArray());

                }

            }
            catch (Exception ex)
            {
                res.value = "!" + ex.Message;


            }


            return Json(res);
        }






        [HttpPost()]
        public JsonResult getTableViewRecords(string PageName, List<inputParameter> Parameters)
        {
            if (Parameters == null)
            {
                Parameters = new List<inputParameter>();
            }
            ConvertNullToEmpty(Parameters);
            if (PDAL.loaded == false)
            {
                PDAL.load();

            }
            Page Info = PDAL.FindPage(PageName);
            PDALSect.AccessResult  DoAccess = PDALSect.GetCheckPer(Info.PerKey, PageName, Parameters);
            ScallerResult Res = new ScallerResult();
            PDAL.InitServerSideParametersForSubmit(PageName, ref Parameters);
            if (DoAccess ==    PDALSect.AccessResult.AccessDenied)
            {
                Res.code = 403;
                Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
                return Json(Res);

            }
            if (DoAccess ==  PDALSect.AccessResult.ReLogin)
            {
                Res.code = 401;
                Res.Message = "نیاز به ورود مجدد می باشد";
                return Json(Res);

            }
            PDAL.ConvertValues(Info, Parameters);

            string error = PDAL.ValidateAndSetDefaultValue(Info, Parameters);
            if (error != "")
            {

                Res.code = 200;
                Res.Message = error;
                return Json(Res);

            }


            try
            {


                Res.code = 0;
                Res.Message = "با موفقیت انجام شد";
                if (Info.DBCommand.StartsWith("$") == false)
                {
                    Res.retrunValue = PDAL.DataTableToJson(PDAL.ReadRecords(ref Info.DBCommand, PDAL.SkipParameters(Info, Parameters)), Res.code, "");
                }
                else
                {
                    Res.retrunValue = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(CustomRecords(Info.DBCommand, PageName, Parameters.ToArray()));

                }
            }
            catch (SqlException Ex)
            {

                Res.code = 300;
                Res.Message = "خطایی رخ داد:" + Ex.ErrorCode.ToString() + ":" + Ex.Message;

            }
            catch (Exception Ex)
            {
                Res.code = 500;
                Res.Message = "خطایی رخ داد:" + Ex.Message;

            }
            return Json(Res);


        }


        [HttpPost()]
        public JsonResult Select2Ajax(string PageName, string ParaName, List<inputParameter> Parameters)
        {
            Page Info = PDAL.FindPage(PageName);
            ConvertNullToEmpty(Parameters);
            PageParameter Pp = Info.DicPageParameters[ParaName];
            for (int k = 0; k < Pp.DBSelectCommandParameters.Count; k++)
            {
                if (Pp.DBSelectCommandParameters[k].source == "Session")
                {
                    inputParameter i = new inputParameter();
                    i.key = Pp.DBSelectCommandParameters[k].name;
                    i.value = PDAL.GetSession(Pp.DBSelectCommandParameters[k].Parameter);
                    Parameters.Add(i);

                }


            }


            DataTable Dt = PDAL.ReadRecords(ref Pp.DBSelect2Command, Parameters);
            List<item> it = new List<item>();
            for (int k = 0; k < Pp.options.Count; k++)
            {
                item i = new item();
                i.id = Pp.options[k].value;
                i.text = Pp.options[k].text;
                it.Add(i);
            }
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                item i = new item();
                i.id = Dt.Rows[k][Pp.codeColumn].ToString();
                i.text = Dt.Rows[k][Pp.textColumn].ToString();
                it.Add(i);
            }
      

            obj o = new obj();
            o.results = it.ToArray();
            return Json(o);
        }
        [HttpPost()]
        public string  sendFiles( string PageName)
        {
         Page p=      PDAL.FindPage(PageName);
         Dictionary<string, string> FileSended = new Dictionary<string, string>();
         for (int k = 0; k < p.PageParameters.Count; k++)
         {
             PageParameter PP = p.PageParameters[k];
             if (PP.type == "FileInput")
             {
               var  C=  Request.Files[PP.name];
               if (C == null)
               {
                   continue;
               }
               if (PP.MaxFileSize != "")
               {

                   if (long.Parse(PP.MaxFileSize) * 512 < C.InputStream.Length)
                   {
                       throw new Exception("اندازه غیر مجاز!!!");

                   }
               }
               bool isCommit = false;
               string ex = System.IO.Path.GetExtension(C.FileName).ToLower().Substring(1);
               for (int xx = 0; xx < PP.FileAllows.Count; xx++)
               {
                   if (ex == PP.FileAllows[xx].ext.ToLower())
                   {
                       isCommit = true;
                   }
               }
               if (isCommit == false)
               {
                   throw new Exception("پسوند غیر مجاز!!!");
               }
             }
         }
         for (int k = 0; k < p.PageParameters.Count; k++)
         {
             PageParameter PP = p.PageParameters[k];
             if (PP.type == "FileInput")
             {
                 var C = Request.Files[PP.name];
                 if (C == null)
                 {
                     continue;
                 }
                 string ex = System.IO.Path.GetExtension(C.FileName).ToLower();
                 string FilePath =  Convertor.MilToPerDate(DateTime.Now).Replace('/', '.')  + (new Random().Next(0,30000000).ToString() )  + "" + ex ;
                 C.SaveAs(Server.MapPath(PP.FilePathAtServer + FilePath));
                  
                 FileSended.Add( PP.name,FilePath );
             }
         }


         Session["FileSended"] = FileSended;
           return "";
        }
        [HttpPost()]
        public JsonResult Select2AjaxTable(string PageName, string colname, List<inputParameter> Parameters)
        {
            Page Info = PDAL.FindPage(PageName);
            ConvertNullToEmpty(Parameters);

            column Pp = null;
            for (int k = 0; k < Info.tables[0].columns.Count; k++)
            {
                if (Info.tables[0].columns[k].name == colname)
                {
                    Pp = Info.tables[0].columns[k];

                }

            }

            for (int k = 0; k < Pp.DBSelectCommandParameters.Count; k++)
            {
                if (Pp.DBSelectCommandParameters[k].source == "Session")
                {
                    inputParameter i = new inputParameter();
                    i.key = Pp.DBSelectCommandParameters[k].name;
                    i.value = PDAL.GetSession(Pp.DBSelectCommandParameters[k].Parameter);
                    Parameters.Add(i);

                }


            }


            DataTable Dt = PDAL.ReadRecords(ref Pp.DBSelect2Command, Parameters);
            List<item> it = new List<item>();
            for (int k = 0; k < Pp.options.Count; k++)
            {
                item i = new item();
                i.id = Pp.options[k].value;
                i.text = Pp.options[k].text;
                it.Add(i);
            }
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                item i = new item();
                i.id = Dt.Rows[k][Pp.codeColumn].ToString();
                i.text = Dt.Rows[k][Pp.textColumn].ToString();
                it.Add(i);
            }

            obj o = new obj();
            o.results = it.ToArray();
            return Json(o);
        }




        public class obj
        {
            public item[] results;

        }
        public class item
        {
            public string id;
            public string text;


        }

        [HttpPost()]
        public JsonResult BatchCommand(string PageName, string CommandName, inputParameter[][][][] records)
        {
            Page Info = PDAL.FindPage(PageName);
            BatchCommand B = null;
            for (int i = 0; i < Info.BatchCommands.Count; i++)
            {
                if (Info.BatchCommands[i].name == CommandName)
                {
                    B = Info.BatchCommands[i];
                    break;
                }

            }    
             ScallerResult Res = new ScallerResult();
               PDALSect.AccessResult DoAccess = PDALSect.GetCheckPer(B.PerKey, PageName, null);
             if (DoAccess ==  PDALSect.AccessResult.AccessDenied)
             {
                 Res.code = 403;
                 Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
                 return Json(Res);

             }
             if (DoAccess == PDALSect.AccessResult.ReLogin)
             {
                 Res.code = 401;
                 Res.Message = "نیاز به ورود مجدد می باشد";
                 return Json(Res);

             }
           SqlConnection Con = PDAL.GetConnection();
           if (Con.State != ConnectionState.Open)
           {
               Con.Open();
           }
           string[] scallerValues = new string[records.Length];


            SqlTransaction Tran = Con.BeginTransaction();
            try
            {
                for (int k = 0; k < records.Length; k++)
                {
                    Command Com = B.Commands[k];
                    List<inputParameter> initValues = new List<inputParameter>();

                    for (int q = 0; q < Com.Parameters.Count; q++)
                    {
                        if (Com.Parameters[q].sourceType == "Session")
                        {
                            inputParameter ix = new inputParameter();
                            ix.key = Com.Parameters[q].name;
                            ix.value = PDAL.GetSession(Com.Parameters[q].sourceTypeParameter);

                            initValues.Add(ix);

                        }
                        if (Com.Parameters[q].sourceType == "SpecValue")
                        {
                            inputParameter ix = new inputParameter();
                            ix.key = Com.Parameters[q].name;
                            ix.value = PDAL.GetSpecValue(Com.Parameters[q].sourceTypeParameter);

                            initValues.Add(ix);

                        }
                        if (Com.Parameters[q].sourceType == "ScallerValues")
                        {
                            inputParameter ix = new inputParameter();
                            ix.key = Com.Parameters[q].name;
                            ix.value = scallerValues[int.Parse(  Com.Parameters[q].sourceTypeParameter)];

                            initValues.Add(ix);

                        }

                    }


                    for (int k2 = 0; k2 < records[k].Length; k2++)
                    {
                        PDAL.ConvertValuesBatch(Info, Com, records[k][k2]);

                        if (Com.DBCommand.StartsWith("$") == false)
                        {
                            for (int k3 = 1; k3 < records[k][k2].Length; k3++)
                            {
                                List<inputParameter> par = new List<inputParameter>();
                                par.AddRange(initValues);
                                par.AddRange(records[k][k2][k3]);
                                scallerValues[k] = PDAL.ExecScallerWithConnection(ref Com.DBCommand, par, Con, Tran);

                            }
                        }
                        else
                        {
                            for (int k3 = 1; k3 < records[k][k2].Length; k3++)
                            {
                                List<inputParameter> par = new List<inputParameter>();
                                par.AddRange(initValues);
                                par.AddRange(records[k][k2][k3]);
                                scallerValues[k] = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(CustomRecords(Com.DBCommand, PageName, par.ToArray()));

                            }

                        }
                    }




                }
                Tran.Commit();
                Res.code = 0;
                Res.Message = "با موفقیت انجام شد";
              
            }
            catch(Exception ex)
            {
                Tran.Rollback();
                Res.code = 500;
                Res.Message = "خطا در انجام عملیات" + "<br />" + ex.Message;
               
            }

           if (Con.State != ConnectionState.Closed)
           {
               Con.Close();
           }
           return Json(Res);
            //ConvertNullToEmpty(Parameters);
            
            //PDAL.ConvertValues(Info, Parameters);
            //ScallerResult Res = new ScallerResult();
            //bool DoAccess = PDALSect.GetCheckPer(Info.PerKey, PageName, Parameters);
            //PDAL.InitServerSideParametersForSubmit(PageName, ref Parameters);
            //string error = PDAL.ValidateAndSetDefaultValue(Info, Parameters);

            //if (DoAccess == false)
            //{
            //    Res.code = 403;
            //    Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
            //    return Json(Res);

            //}
            //if (error != "")
            //{
            //    Res.code = 200;
            //    Res.Message = error;
            //    return Json(Res);

            //}


            //try
            //{


            //    Res.code = 0;
            //    Res.Message = "با موفقیت انجام شد";
            //    Res.retrunValue = PDAL.ExecScaller(Info.DBCommand, PDAL.SkipParameters(Info, Parameters));

            //}
            //catch (SqlException Ex)
            //{

            //    Res.code = 300;
            //    Res.Message = "خطایی رخ داد:" + Ex.ErrorCode.ToString() + ":" + Ex.Message;

            //}
            //catch (Exception Ex)
            //{
            //    Res.code = 500;
            //    Res.Message = "خطایی رخ داد:" + Ex.Message;

            //}
            //return Json(Res);
        
        }

 

    
        [HttpPost()]
        public JsonResult ScallerSubmit(string PageName, List<inputParameter> Parameters)
        {
            if (Parameters == null)
            {
                Parameters = new List<inputParameter>();
            }
            ConvertNullToEmpty(Parameters);
            Page Info=PDAL.FindPage(PageName);
            PDAL.ConvertValues(Info, Parameters);
            ScallerResult Res = new ScallerResult();
            PDALSect.AccessResult DoAccess = PDALSect.GetCheckPer(Info.PerKey, PageName, Parameters);
            PDAL.InitServerSideParametersForSubmit(PageName, ref Parameters);
            string error= PDAL.ValidateAndSetDefaultValue(Info, Parameters);

            if (DoAccess ==  PDALSect.AccessResult.AccessDenied)
            {
                Res.code = 403;
                Res.Message = "شما اجازه دسترسی به این قسمت را ندارید";
                return Json(Res);

            }
            if (DoAccess ==  PDALSect.AccessResult.ReLogin)
            {
                Res.code = 401;
                Res.Message = "نیاز به ورود مجدد می باشد";
                return Json(Res);

            }
            if (error != "")
            {
                Res.code = 200;
                Res.Message = error;
                return Json(Res);

            }
         
        
            try
            {


                Res.code = 0;
                Res.Message = "با موفقیت انجام شد";
                if (Info.DBCommand.StartsWith("$") == false)
                {
                    Res.retrunValue = PDAL.ExecScaller(ref Info.DBCommand, PDAL.SkipParameters(Info, Parameters));
                }
                else
                {
                    Res.retrunValue = CustomScaler(Info.DBCommand, PageName, Parameters.ToArray());


                }
            }
            catch (SqlException Ex)
            {

                Res.code = 300;
                Res.Message = "خطایی رخ داد:" +  Ex.ErrorCode.ToString() +":"  + Ex.Message;

            }
            catch(Exception Ex)
            {
                Res.code = 500;
                Res.Message ="خطایی رخ داد:" + Ex.Message;
                
            }
            return Json(Res);

        }

        private static void ConvertNullToEmpty(List<inputParameter> Parameters)
        {
             
            for (int k = 0; k < Parameters.Count; k++)
            {
                Parameters[k].value = (Parameters[k].value == null ? "" : Parameters[k].value);
            }
        }
    }
}
