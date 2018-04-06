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
        public static int GetCheckPer(string PerKey, String PageName, List<inputParameter> Params)
        {

            return 200;

        }
    }
}