using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PDALEngine
{
    public class PDALSect
    {
        public static bool isLogined()
        {
          return   HttpContext.Current.Session["UserName"]!=null;
        }
        public static string  GetUserName()
        {
            if (HttpContext.Current.Session["UserName"] == null)
            {
                return null;

            }
            else
            {
              return   HttpContext.Current.Session["UserName"].ToString();
            }
        }
        public enum AccessResult
        {
            Permitted=200,
            ReLogin=401,
            AccessDenied=403

        }
        public static AccessResult GetCheckPer(string PerKey, String PageName, List<inputParameter> Params)
        {
            return AccessResult.Permitted;
            if (PerKey == "")
            {
                return AccessResult.Permitted;

            }
            if (isLogined() == false)
            {
                return AccessResult.ReLogin;

            }
            Dictionary<string, string> r = (Dictionary<string, string>)(HttpContext.Current.Session["Per"]);
            if (r.ContainsKey(PerKey) == false)
            {
                return AccessResult.AccessDenied;
            }
            else
            {
                return AccessResult.Permitted;
            }
        }
    }
}