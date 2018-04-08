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
            return true;
        }
        public static string  GetUserName()
        {
            return "Test";
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

        }
    }
}