using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using DotLiquid;
using System.Text;
using System.IO;
using System.Web.UI;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Globalization;
namespace PDALEngine
{
    public class inputParameter
    {
        public string  key { get; set; }
        public string value { get; set; }

    }
    public static  class Convertor
    {
      static    PersianCalendar Ps = new PersianCalendar();
        public static string PerDateToMilDate(string val)
        {
            if (val == null)
            {
                return null;

            }

            if (val == "")
            {
                return null;

            }

            string[] date = val.ToString().Split('/');

            return Ps.ToDateTime(int.Parse(date[0]), int.Parse(date[1]), int.Parse(date[2]), 0, 0, 0, 0).ToShortDateString();
        }
        public static string MilToPerDate( DateTime val)
        {
            return Ps.GetYear(val).ToString("D4") + "/" + Ps.GetMonth(val).ToString("D2") + "/" + Ps.GetDayOfMonth(val).ToString("D2");
        }
        public static string CheckBoxToBit(string val)
        {
            return (val == "on" ? "1" : "0");

        }
        public static string MoneyToInteger(string val)
        {
            return (val.Replace(",", ""));

        }

    }
    public static class Validator
    {
        public static void CheckEmpty(inputParameter para, ref string err, string caption)
        {
            if (para.value == "")
            {
                err += "   عبارت " + caption + " نبایسی خالی  رها شود \r\n";

            }

        }
        public static void CheckEmail(inputParameter para, ref string err, string caption)
        {

            try
            {
                System.Net.Mail.MailAddress m = new System.Net.Mail.MailAddress(para.value);
                if (m.Address != para.value)
                {
                    err += "فرمت ایمیل صحیح نیست\r\n";

                }

            }
            catch
            {

                err += "فرمت ایمیل صحیح نیست\r\n";
            }
           

        }
        public static void CheckStringLength(inputParameter para, ref string err, string caption,int  Length)
        {
            if (para.value.Length !=Length)
            {
                err += " طول عبارت  " + caption + " بایستی " + Length + " باشد  \r\n";

            }

        }
        public static void CheckNumberInt(inputParameter para, ref string err, string caption)
        {
            try
            {
                long.Parse(para.value);

            }
            catch
            {

                err += "عدد وارد شده در کادر " + caption + " صحیح نیست ";
            }

        }
        public static void CheckNumberFloat(inputParameter para, ref string err, string caption)
        {
            try
            {
                decimal.Parse(para.value);

            }
            catch
            {

                err += "عدد وارد شده در کادر " + caption + " صحیح نیست ";
            }

        }
        public static void CheckDate(inputParameter para, ref string err, string caption)
        {
            return;




            try
            {
              
                string[] date =para.value.Split('/');
                PersianCalendar Ps=new PersianCalendar();
                   Ps.ToDateTime(int.Parse(date[0]), int.Parse(date[1]), int.Parse(date[2]), 0, 0, 0, 0).ToShortDateString();
              
            
            }
            catch
            {

               err+="تاریخ وارد شده در کادر " + caption + " صحیح نیست ";
            }

        }
    }

    public static class ViewExtensions
    {
       


        public static string RenderToString(this PartialViewResult partialView)
        {
            var httpContext = HttpContext.Current;

            if (httpContext == null)
            {
                throw new NotSupportedException("An HTTP context is required to render the partial view to a string");
            }

            var controllerName = httpContext.Request.RequestContext.RouteData.Values["controller"].ToString();

            var controller = (ControllerBase)ControllerBuilder.Current.GetControllerFactory().CreateController(httpContext.Request.RequestContext, controllerName);

            var controllerContext = new ControllerContext(httpContext.Request.RequestContext, controller);

            var view = ViewEngines.Engines.FindPartialView(controllerContext, partialView.ViewName).View;

            var sb = new StringBuilder();

            using (var sw = new StringWriter(sb))
            {
                using (var tw = new HtmlTextWriter(sw))
                {
                    view.Render(new ViewContext(controllerContext, view, partialView.ViewData, partialView.TempData, tw), tw);
                }
            }

            return sb.ToString();
        }
    }
    public static class Util
    {
        public static string Attr(this XmlNode cur, string attr)
        {
            if (cur.Attributes[attr] == null)
            {
                return "";
            }
            else
            {
                return cur.Attributes[attr].Value.ToString();
            }
            return "";
        }
        public static SqlCommand InitCommanD(ref string command,List<inputParameter> Paras, SqlConnection Con)
        {
            char type = command[0];
            SqlCommand Com;
            switch (type)
            {
                case '#':
                    string[] paras = command.Substring(1).Split(',');
                    string tableName = paras[0];
                    string action = paras[1];
                    StringBuilder Sb = new StringBuilder();
                    if (action == "Insert")
                    {
                      Sb.Append("Insert into " + tableName + " ( " );
                        for (int k = 0; k < Paras.Count; k++)
                        {
                            if (k != 0)
                            {
                                Sb.Append(",");
                            }
                            Sb.Append("[" + Paras[k].key + "]");
                        }
                        Sb.Append(") values (");
                        for (int k = 0; k < Paras.Count; k++)
                        {
                            if (k != 0)
                            {
                                Sb.Append(",");
                            }
                            Sb.Append("@" + Paras[k].key + "");
                        }

                        Sb.Append(")");
                    }

                    if (action == "InsertIdentity")
                    {
                        Sb.Append("Insert into " + tableName + " ( ");
                        for (int k = 0; k < Paras.Count; k++)
                        {
                            if (k != 0)
                            {
                                Sb.Append(",");
                            }
                            Sb.Append("[" + Paras[k].key + "]");
                        }
                        Sb.Append(") values (");
                        for (int k = 0; k < Paras.Count; k++)
                        {
                            if (k != 0)
                            {
                                Sb.Append(",");
                            }
                            Sb.Append("@" + Paras[k].key + "");
                        }

                        Sb.Append(")");
                        Sb.Append(";Select Scope_Identity() ");
                    }


                    if ((action == "Delete") || (action == "DeleteTop"))
                    {
                        Sb.Append("Delete "  + (action=="DeleteTop"?" Top(1) ":"" ) + " from " + tableName + ((Paras.Count!= 0 ?" where ":" " )));
                        for (int k = 0; k < Paras.Count; k++)
                        {
                            if (k != 0)
                            {
                                Sb.Append(" and ");
                            }
                            Sb.Append("[" + Paras[k].key + "]=" + "@" + Paras[k].key);
                        }
                        Sb.Append(" ");
               
                    }
                    if(action=="SelectAll")
                    {
                        Sb.Append("Select * from " + tableName );


                    }
                       if(action=="SelectOne")
                    {
                        Sb.Append("Select Top(1) * from " + tableName );
                        Sb.Append(" Where ");
                           for (int k = 0; k < Paras.Count; k++)
                        {
                            if (k != 0)
                            {
                                Sb.Append(" and  ");
                            }
                            Sb.Append("[" + Paras[k].key + "]=" + "@" + Paras[k].key);
                        }

                    }
                    if ((action == "Update") || (action == "UpdateTop"))
                    {
                        Sb.Append("Update " + (action == "UpdateTop" ? " Top(1) " : "") + tableName + " Set " ) ;
                        bool fr = true;
                        for (int k = 0; k < Paras.Count; k++)
                        {
                      
                            if (Array.IndexOf(paras, Paras[k].key) == -1)
                            {
                                if (!fr)
                                {
                                    Sb.Append(" , ");
                                }
                                fr = false;
                                Sb.Append("[" + Paras[k].key + "]=" + "@" + Paras[k].key);

                            }

                       
                        }
                        if (paras.Length > 2)
                        {
                            Sb.Append(" Where ");
                        }
                        for(int k=2;k<paras.Length;k+=2)
                        {
                            if(k!=2)
                            {

                                   Sb.Append(" and  ");
                            }

                             Sb.Append("[" + paras[k] + "]=" + "@" + paras[k+1]);
                        }
                        Sb.Append(" ");

                    }
                      Com = new SqlCommand(Sb.ToString(), Con);
                      command ="?" + Com.CommandText;
                      return Com;
                    break;
                case '?':
                     Com = new SqlCommand(command.Substring(1), Con);
                    Com.CommandType = CommandType.Text;
                    return Com;
                    break;
                default:
                       Com = new SqlCommand(command, Con);
                    Com.CommandType = CommandType.StoredProcedure;
                    return Com;
                    break;

            }


        }

    }
 

    public class PDAL
    {
        private static DataTable ReadDataTableNotCommand(string cmd)
        {
            SqlCommand Com = new SqlCommand(cmd, GetConnection());
            Com.CommandType = System.Data.CommandType.Text;
            
            DataTable Records = new DataTable();
            SqlDataAdapter Da = new SqlDataAdapter(Com);
            Da.Fill(Records);
            Com.Connection.Close();
            return Records;

        }
        private static string AllColumns(StringBuilder Sb, DataTable Dt)
        {
            string s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];

                if (s != "")
                {
                    s += ",\r\n";
                }

                s += "\t\t@" + R["Name"].ToString() + " " + R["name_type"].ToString();
                if (R["name_type"].ToString() == "nvarchar")
                {
                    s += "(max)";
                }
                s += " ";

            }
            Sb.AppendLine(s);
            return s;
        }
        private static string AllColumnsCode(StringBuilder Sb, DataTable Dt)
        {
            string s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];

                if (s != "")
                {
                    s += ",";
                }

                s += "List[k]." + R["Name"].ToString();



            }
            Sb.AppendLine(s);
            return s;
        }
        private static string AllEditableColumns(StringBuilder Sb, DataTable Dt)
        {
            string s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",\r\n";
                    }

                    s += "\t\t@" + R["Name"].ToString() + " " + R["name_type"].ToString();
                    if (R["name_type"].ToString() == "nvarchar")
                    {
                        s += "(max)";
                    }
                    s += " ";
                }
            }
            Sb.AppendLine(s);
            return s;
        }


        private static string AllEditableColumnsCode(StringBuilder Sb, DataTable Dt)
        {
            string s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",";
                    }

                    s += "List[k]." + R["Name"].ToString();


                }
            }
            Sb.AppendLine(s);
            return s;
        }

        private static string AllEditableColumnsCode2(StringBuilder Sb, DataTable Dt)
        {
            string s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",";
                    }

                    s += "" + R["Name"].ToString();


                }
            }
            Sb.AppendLine(s);
            return s;
        }

        private static string WherePrimaryKeys(DataTable Dt, string s)
        {
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_primary_key"].ToString() == "True")
                {
                    if (s != "")
                    {
                        s += " and ";
                    }

                    s += "\t\t[" + R["Name"].ToString() + "]=@" + R["Name"].ToString() + "\r\n";


                }
            }
            return s;
        }

        private static string PrimaryKeyParameter(DataTable Dt, string s)
        {
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_primary_key"].ToString() == "True")
                {
                    if (s != "")
                    {
                        s += ",\r\n";
                    }

                    s += "\t\t@" + R["Name"].ToString() + " " + R["name_type"].ToString();
                    if (R["name_type"].ToString() == "nvarchar")
                    {
                        s += "(max)";
                    }
                    s += " ";



                }
            }
            return s;

        }

        public static string GetDesc(string key)
        {
          return   PDAL.ReadDataTableNotCommand("Select Coalesce(NULL,(select value from sys.extended_properties where     minor_id=(select top(1) column_Id from sys.columns where sys.columns.name=@qword order by column_Id) and major_id= (select top(1) object_id from sys.columns where sys.columns.name=@qword order by column_Id) and name='MS_Description'))".Replace("@qword", "\'" + key + "\'")).Rows[0][0].ToString();



        }
        public static string mgtAllonce(string tableName)
        {
            string CommandLine = ""+ tableName +"_Serach";
           
            DataTable Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");
            DataTable TableInfo = PDAL.ReadDataTableNotCommand("select sys.columns.*,(select top(1) name  from sys.types where sys.types.system_type_id=sys.columns.system_type_id) name_type,(select is_primary_key from sys.indexes where sys.indexes.object_id=sys.columns.object_id and index_id=column_id ) is_primary_key from sys.columns,sys.objects where sys.columns.object_id=sys.objects.object_id and sys.objects.name='" + tableName + "' and sys.objects.type='u'");
           

            StringBuilder Sb = new StringBuilder();
            Sb.Append("<Page Title=\"" + CommandLine + "\" name=\"" + CommandLine + "\" link=\"" + CommandLine + "\" ColumnCount=\"2\" PerKey=\"" + CommandLine + "\" type=\"TableView\" DBCommand=\"" + CommandLine + "\">");
            string tq = "Sb.Append(\"{0}\");\r\n";
            SqlConnection Con = GetConnection();
            SqlCommand Com = new SqlCommand(CommandLine);
            Com.Connection = Con;
            Com.CommandType = CommandType.StoredProcedure;
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                if (Dt.Rows[k]["DATA_TYPE"].ToString().Contains("date") == false)
                {
                    Com.Parameters.AddWithValue(Dt.Rows[k]["PARAMETER_NAME"].ToString(), "0");
                }
                else
                {
                    Com.Parameters.AddWithValue(Dt.Rows[k]["PARAMETER_NAME"].ToString(), DateTime.Now);

                }
            }
            if (Com.Connection.State == ConnectionState.Closed)
            {
                Com.Connection.Open();
            }
            DataTable ResultDt = new DataTable();
            SqlDataAdapter Da = new SqlDataAdapter(Com);
            Da.Fill(ResultDt);
            if (Com.Connection.State == ConnectionState.Open)
            {
                Com.Connection.Close();
            }
            Sb.AppendLine(String.Format("<table>"));
            for (int k = 0; k < ResultDt.Columns.Count; k++)
            {

                Sb.AppendLine(String.Format("<column title=\"{0}\" name=\"{1}\" type=\"DisplayValue\" ></column>", GetDesc(ResultDt.Columns[k].ColumnName), ResultDt.Columns[k].ColumnName));
            
            }
            string column="";
            for(int k=0;k<TableInfo.Rows.Count;k++)
            {
                DataRow R=TableInfo.Rows[k];
                    if (R["is_primary_key"].ToString() == "True")
                    {
                       if(column!="")
                       {
                           column+="/";
                       }
                       column += "{{record." + R["name"].ToString() + "}}";
                    }
            }



            Sb.AppendFormat(" <column title=\"ویرایش \"  type=\"PDALink\"  Caption=\"ویرایش\" linkSyntax=\"{0}/{1}\"></column>", tableName + "_Edit", column);
              column = "";
            for (int k = 0; k < TableInfo.Rows.Count; k++)
            {
                DataRow R = TableInfo.Rows[k];
                if (R["is_primary_key"].ToString() == "True")
                {
                    if (column != "")
                    {
                        column += ",";
                    }
                    column += "'{{record." + R["name"].ToString() + "}}'";
                }
            }


            Sb.AppendFormat("  <column title=\"حذف \"   type=\"AjaxAction\" AskMessage=\"آیا مطممن هستید?\" AjaxAction=\"{0}_Delete\" ParameterSyntax=\"{1}\"   Caption=\"حذف\"></column>", tableName, column);


            


           


            Sb.AppendLine(String.Format("</table>"));

            List<String> SQLDATAType = new List<string>();
            SQLDATAType.AddRange(new String[] { "image", "text", "uniqueidentifier", "tinyint", "smallint", "intsmalldatetime", "real", "moneydatetime", "float", "sql_variant", "ntext", "bit", "decimal", "numeric", "smallmoney", "bigint", "varbinary", "varchar", "binary", "char", "timestamp", "nvarchar", "nchar", "xml", "sysname", "datetime", "int" });
            List<String> DataType = new List<string>();
            DataType.AddRange(new string[] { "fileInput", "String", "String", "DropDown", "Integer", "DateTime", "Float", "Date", "Float", "String", "String", "CheckBox", "Float", "Float", "Integer", "Integer", "Hidden", "String", "String", "String", "timestamp", "String", "String", "XmlDocument", "String", "Date", "Integer" });

            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                Sb.AppendLine(String.Format("<PageParameter title=\"{0}\" name=\"{1}\" type=\"{2}\" source=\"form\" > </PageParameter>", GetDesc(Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)), Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1), DataType[SQLDATAType.IndexOf(Dt.Rows[k]["DATA_TYPE"].ToString())]));


            }
            Sb.AppendFormat("<Button title=\"{0}\" action=\"goToPage\" actionParameter=\"{1}\" />","جدید",tableName +"_Insert");


            Sb.AppendLine("</Page>\r\n");
            CommandLine = "" + tableName + "_Insert_Sp";
            Sb.Append("<Page Title=\"" + CommandLine + "\" name=\"" + tableName +"_Insert" + "\" link=\"" + CommandLine + "\" ColumnCount=\"2\" PerKey=\"" + CommandLine + "\" type=\"ScallerForm\" DBCommand=\"" + CommandLine + "\">");
          



              Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");


            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                Sb.AppendLine(String.Format("<PageParameter title=\"{0}\" name=\"{1}\" type=\"{2}\" source=\"form\" ><ParameterCheck Cond=\"Reg\"></ParameterCheck></PageParameter>", GetDesc(Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)), Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1), DataType[SQLDATAType.IndexOf(Dt.Rows[k]["DATA_TYPE"].ToString())]));
            }



            Sb.AppendLine("</Page>\r\n");

            CommandLine = "" + tableName + "_Update_Sp";
            column = "";
            for (int k = 0; k < TableInfo.Rows.Count; k++)
            {
                DataRow R = TableInfo.Rows[k];
                if (R["is_primary_key"].ToString() == "True")
                {
               
                    column += "/:" + R["name"].ToString() ;
                }
            }
            Sb.Append("<Page Title=\"" + CommandLine + "\" name=\"" + tableName + "_Edit" + "\" link=\"" + tableName + "_Edit\"" + " queryString=\"" + column+"\"   ValueDbCommand=\""+ tableName +"_SelectRow\"   ColumnCount=\"2\" PerKey=\"" + CommandLine + "\" type=\"ScallerForm\" DBCommand=\"" + CommandLine + "\">");
            for (int k = 0; k < TableInfo.Rows.Count; k++)
            {
                DataRow R = TableInfo.Rows[k];
                if (R["is_primary_key"].ToString() == "True")
                {

                    Sb.AppendFormat("<ValueParameter name=\"{0}\" value=\"{0}\" source=\"QueryString\"></ValueParameter>", R["name"].ToString());
                }
            }



            Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");
            column = "";
            for (int k = 0; k < TableInfo.Rows.Count; k++)
            {
                DataRow R = TableInfo.Rows[k];
                if (R["is_primary_key"].ToString() == "True")
                {

                    column += "[" + R["name"].ToString() +"]" ;
                }
            }
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                string para = Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1);
                if (column.IndexOf("[" + para + "]") == -1)
                {
                    Sb.AppendLine(String.Format("<PageParameter title=\"{0}\" name=\"{1}\" type=\"{2}\" source=\"form\"  startValueType=\"DbValueCommand\" Parameter=\"{1}\" ><ParameterCheck Cond=\"Reg\"></ParameterCheck></PageParameter>", GetDesc(Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)), Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1), DataType[SQLDATAType.IndexOf(Dt.Rows[k]["DATA_TYPE"].ToString())]));
                }
                else
                {
                    Sb.AppendLine(String.Format("<PageParameter title=\"{0}\" name=\"{1}\" type=\"{2}\" source=\"QueryString\"   Parameter=\"{1}\" > </PageParameter>", GetDesc(Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)), Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1), DataType[SQLDATAType.IndexOf(Dt.Rows[k]["DATA_TYPE"].ToString())]));
           

                }


            }

            Sb.AppendLine("</Page>\r\n");




                 CommandLine = ""+ tableName +"_Delete_Sp";
           Sb.AppendFormat(" <action name=\"{0}\"    DBCommand=\"{1}\" PerKey=\"{2}\">",tableName +"_Delete" ,CommandLine,CommandLine);
    


               Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");


            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                Sb.AppendLine(String.Format(" <actionParameter name=\"{0}\" type=\"input\" Parameter=\"{0}\"></actionParameter>",Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)));
            }



            Sb.AppendLine("</action>");
            return Sb.ToString();




            return Sb.ToString();




        }
        public static string GetQuickSerachProc(string table)
        {
            StringBuilder Sb = new StringBuilder();
            DataTable Dt = PDAL.ReadDataTableNotCommand("Select sys.columns.name,(Select top(1) name from sys.types where  sys.types.system_type_id= sys.columns.system_type_id ) system_type_id,((select top(1) 1    from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where table_name=@tablename and column_name=sys.columns.name )) iskey from sys.columns  ,sys.objects where type='u' and sys.objects.name=@tablename and sys.objects.object_id=sys.columns.object_id".Replace("@tablename", "'" + table + "'"));
            Sb.AppendFormat("Create Proc QuickSerach_In{0} \r\n @Q nvarchar(max) as begin ", table);
            Sb.Append("\r\n Select TOP(20) ");
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                if (Dt.Rows[k]["iskey"].ToString() == "1")
                {
                    Sb.Append(Dt.Rows[k]["name"].ToString() + " value ,");
                    break;

                }

            }
            string MatchData = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                if (Dt.Rows[k]["system_type_id"].ToString() == "bigint")
                {
                    if (MatchData != "")
                    {
                        MatchData += " + ' ' + ";
                    }
                    MatchData += "convert(nvarchar(max)," + Dt.Rows[k]["name"].ToString() + ") \r\n";
                }
                if (Dt.Rows[k]["system_type_id"].ToString() == "nvarchar")
                {
                    if (MatchData != "")
                    {
                        MatchData += " + ' ' + ";
                    }
                    MatchData += "" + Dt.Rows[k]["name"].ToString() + " \r\n";
                }


            }
            MatchData += " title ";
            Sb.Append(" " + MatchData);
            string ConData = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                if (Dt.Rows[k]["system_type_id"].ToString() == "bigint")
                {
                    if (ConData != "")
                    {
                        ConData += " or ";
                    }
                    ConData += "convert(nvarchar(max)," + Dt.Rows[k]["name"].ToString() + ") like '%'+ @Q +  '%' \r\n";
                }
                if (Dt.Rows[k]["system_type_id"].ToString() == "nvarchar")
                {
                    if (ConData != "")
                    {
                        ConData += " or ";
                    }
                    ConData += "" + Dt.Rows[k]["name"].ToString() + " like '%'+ @Q +  '%' \r\n";
                }


            }

            Sb.Append("\r\n from " + table + "\r\n where " + ConData);
            Sb.Append("\r\nend");
            return Sb.ToString();

        }

        
 
        public static string GenAction(string CommandLine,string name )
        {
            StringBuilder Sb = new StringBuilder();
            Sb.AppendFormat(" <action name=\"{0}\"    DBCommand=\"{1}\" PerKey=\"{2}\">",name ,CommandLine,CommandLine);
    


            List<String> SQLDATAType = new List<string>();
            SQLDATAType.AddRange(new String[] { "image", "text", "uniqueidentifier", "tinyint", "smallint", "intsmalldatetime", "real", "moneydatetime", "float", "sql_variant", "ntext", "bit", "decimal", "numeric", "smallmoney", "bigint", "varbinary", "varchar", "binary", "char", "timestamp", "nvarchar", "nchar", "xml", "sysname", "datetime", "int" });
            List<String> DataType = new List<string>();
            DataType.AddRange(new string[] { "fileInput", "String", "String", "DropDown", "Integer", "DateTime", "Float", "DateTime", "Float", "String", "String", "CheckBox", "Float", "Float", "Integer", "Integer", "Hidden", "String", "String", "String", "timestamp", "String", "String", "XmlDocument", "String", "DateTime", "Integer" });
            DataTable Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");


            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                Sb.AppendLine(String.Format(" <actionParameter name=\"{0}\" type=\"input\" Parameter=\"{0}\"></actionParameter>",Dt.Rows[k]["PARAMETER_NAME"].ToString()));
            }



            Sb.AppendLine("</Page>");
            return Sb.ToString();


        }

         public static string GenPageForSaveOnePageMaster(string CommandLine)
        {
            DataTable Dt = PDAL.ReadDataTableNotCommand("select sys.columns.*,(select top(1) name  from sys.types where sys.types.system_type_id=sys.columns.system_type_id) name_type,(select is_primary_key from sys.indexes where sys.indexes.object_id=sys.columns.object_id and index_id=column_id ) is_primary_key from sys.columns,sys.objects where sys.columns.object_id=sys.objects.object_id and sys.objects.name='" + CommandLine + "' and sys.objects.type='u'");
          StringBuilder Sb=new StringBuilder();
           
             Sb.AppendFormat("<Page Title=\"تعریف\"  ColumnCount=\"1\" link=\"{0}_mgt\"  name=\"{0}_mgt\" id=\"{0}_mgt\" DBCommand=\"#{0},SelectAll\" type=\"TableView\" PerKey=\"\" >\r\n",CommandLine);
           Sb.AppendLine("<table BasicFilter=\"Yes\"  Insertable=\"Yes\" RowNumberColumn=\"Yes\" Sortable=\"Yes\"  >");
           for (int k = 0; k < Dt.Rows.Count; k++)
           {
                 DataRow R = Dt.Rows[k];
               Sb.AppendFormat("<column title=\"{1}\" name=\"{0}\" ",R["name"].ToString(),GetDesc(R["name"].ToString()));
               Sb.AppendFormat(" type=\"{0}\" ></column>", (R["is_identity"].ToString() == "False"?"InputString":"DisplayValue"));
            

                   /*
                    *   DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",\r\n";
                    }

                    s += "\t\t" + R["Name"].ToString() + " ";


                }
                    * 
                    */

           }
           Sb.AppendFormat("    <column title=\"حذف ردیف\" Caption=\"حذف\" type=\"DeleteRow\" ></column>\r\n");
           Sb.AppendLine("</table>");
           Sb.AppendFormat("     <Button action=\"InsertRecordToTable\" title=\"ردیف جدید\"/><Button action=\"BatchCommand\" actionParameter=\"Save\" title=\"ذخیره\"/>");
           Sb.AppendFormat("<BatchCommand name=\"Save\" PerKey=\"\">");
           Sb.AppendFormat("   <Command DBCommand=\"#{0},Insert\" Selection=\"All\" StateMode=\"Added\">",CommandLine);
           for (int k = 0; k < Dt.Rows.Count; k++)
           {
               DataRow R = Dt.Rows[k];
            

               
         
            if (R["is_identity"].ToString() == "False")
            {
                Sb.AppendFormat("  <Parameter caption=\"{1}\"  name=\"{0}\" sourceType=\"Row\" sourceTypeParameter=\"{0}\"> <Check Type=\"ReqString\" /> </Parameter>\r\n",R["name"].ToString(),GetDesc(R["name"].ToString()));
            }
                
                

           }
           Sb.AppendFormat("   </Command>");
           Sb.AppendFormat("   <Command DBCommand=\"#{0},UpdateTop",CommandLine);
           for (int k = 0; k < Dt.Rows.Count; k++)
           {
               DataRow R = Dt.Rows[k];
               if (R["is_identity"].ToString() == "True")
               {
                   Sb.AppendFormat(",{0},{0}", R["name"].ToString());
               }
           }
           Sb.AppendFormat(  "\" Selection=\"All\" StateMode=\"Changed\">\r\n");
           for (int k = 0; k < Dt.Rows.Count; k++)
           {
               DataRow R = Dt.Rows[k];




       
                   Sb.AppendFormat("  <Parameter caption=\"{1}\"  name=\"{0}\" sourceType=\"Row\" sourceTypeParameter=\"{0}\"> <Check Type=\"ReqString\" /> </Parameter>\r\n", R["name"].ToString(), GetDesc(R["name"].ToString()));


           }
           Sb.AppendFormat("   </Command>");
           Sb.AppendFormat("   <Command DBCommand=\"#{0},DeleteTop", CommandLine);
           for (int k = 0; k < Dt.Rows.Count; k++)
           {
               DataRow R = Dt.Rows[k];
               if (R["is_identity"].ToString() == "True")
               {
                   Sb.AppendFormat(",{0},{0}", R["name"].ToString());
               }
           }
           Sb.AppendFormat("\" Selection=\"All\" StateMode=\"Deleted\">\r\n");
           for (int k = 0; k < Dt.Rows.Count; k++)
           {
               DataRow R = Dt.Rows[k];



               if (R["is_identity"].ToString() == "True")
               {

                   Sb.AppendFormat("  <Parameter caption=\"{1}\"  name=\"{0}\" sourceType=\"Row\" sourceTypeParameter=\"{0}\"> <Check Type=\"ReqString\" /> </Parameter>\r\n", R["name"].ToString(), GetDesc(R["name"].ToString()));
               }

           }
           Sb.AppendFormat("   </Command>");

           Sb.AppendFormat("</BatchCommand>");
            Sb.AppendLine("</Page>");
            return Sb.ToString();
        }

        public static string GenPageForTableView(string CommandLine)
        {
               DataTable Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");


            StringBuilder Sb = new StringBuilder();
            Sb.Append("<Page Title=\"" + CommandLine + "\" name=\"" + CommandLine + "\" link=\"" + CommandLine + "\" ColumnCount=\"2\" PerKey=\"" + CommandLine + "\" type=\"TableView\" DBCommand=\"" + CommandLine + "\">");
            string tq = "Sb.Append(\"{0}\");\r\n";
            SqlConnection Con = GetConnection();
            SqlCommand Com = new SqlCommand(CommandLine);
            Com.Connection = Con;
            Com.CommandType = CommandType.StoredProcedure;
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                if (Dt.Rows[k]["DATA_TYPE"].ToString().Contains("date") == false)
                {
                    Com.Parameters.AddWithValue(Dt.Rows[k]["PARAMETER_NAME"].ToString(), "0");
                }
                else
                {
                    Com.Parameters.AddWithValue(Dt.Rows[k]["PARAMETER_NAME"].ToString(), DateTime.Now);

                }
            }
            if (Com.Connection.State == ConnectionState.Closed)
            {
                Com.Connection.Open();
            }
               DataTable ResultDt = new DataTable();
            SqlDataAdapter Da = new SqlDataAdapter(Com);
            Da.Fill(ResultDt);
            if (Com.Connection.State == ConnectionState.Open)
            {
                Com.Connection.Close();
            }
            Sb.AppendLine(String.Format("<table>"));
            for (int k = 0; k < ResultDt.Columns.Count; k++)
            {

                Sb.AppendLine(String.Format("<column title=\"{0}\" name=\"{1}\" type=\"DisplayValue\" ></column>", GetDesc(ResultDt.Columns[k].ColumnName), ResultDt.Columns[k].ColumnName));
            }

            Sb.AppendLine(String.Format("</table>"));

            List<String> SQLDATAType = new List<string>();
            SQLDATAType.AddRange(new String[] { "image", "text", "uniqueidentifier", "tinyint", "smallint", "intsmalldatetime", "real", "moneydatetime", "float", "sql_variant", "ntext", "bit", "decimal", "numeric", "smallmoney", "bigint", "varbinary", "varchar", "binary", "char", "timestamp", "nvarchar", "nchar", "xml", "sysname", "datetime", "int" });
            List<String> DataType = new List<string>();
            DataType.AddRange(new string[] { "fileInput", "String", "String", "DropDown", "Integer", "DateTime", "Float", "DateTime", "Float", "String", "String", "CheckBox", "Float", "Float", "Integer", "Integer", "Hidden", "String", "String", "String", "timestamp", "String", "String", "XmlDocument", "String", "DateTime", "Integer" });
         
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                Sb.AppendLine(String.Format("<PageParameter title=\"{0}\" name=\"{1}\" type=\"{2}\" source=\"form\" > ", GetDesc(Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)), Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1), DataType[SQLDATAType.IndexOf(Dt.Rows[k]["DATA_TYPE"].ToString())]));


            }



            Sb.AppendLine("</Page>");
            return Sb.ToString();
        }
        public static string GenPageForScaller(string CommandLine)
        {
            StringBuilder Sb = new StringBuilder();
            Sb.Append("<Page Title=\"" + CommandLine + "\" name=\"" + CommandLine + "\" link=\"" + CommandLine + "\" ColumnCount=\"2\" PerKey=\"" + CommandLine + "\" type=\"TableView\" DBCommand=\"" + CommandLine + "\">");
            string tq = "Sb.Append(\"{0}\");\r\n";



            List<String> SQLDATAType = new List<string>();
            SQLDATAType.AddRange(new String[] { "image", "text", "uniqueidentifier", "tinyint", "smallint", "intsmalldatetime", "real", "moneydatetime", "float", "sql_variant", "ntext", "bit", "decimal", "numeric", "smallmoney", "bigint", "varbinary", "varchar", "binary", "char", "timestamp", "nvarchar", "nchar", "xml", "sysname", "datetime", "int" });
            List<String> DataType = new List<string>();
            DataType.AddRange(new string[] { "fileInput", "String", "String", "DropDown", "Integer", "DateTime", "Float", "DateTime", "Float", "String", "String", "CheckBox", "Float", "Float", "Integer", "Integer", "Hidden", "String", "String", "String", "timestamp", "String", "String", "XmlDocument", "String", "DateTime", "Integer" });
            DataTable Dt = PDAL.ReadDataTableNotCommand("select * from information_schema.parameters where specific_name='" + CommandLine + "'");


            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                Sb.AppendLine(String.Format("<PageParameter title=\"{0}\" name=\"{1}\" type=\"{2}\" source=\"form\" ><ParameterCheck Cond=\"Reg\"></ParameterCheck></PageParameter>", GetDesc(Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1)), Dt.Rows[k]["PARAMETER_NAME"].ToString().Substring(1), DataType[SQLDATAType.IndexOf(Dt.Rows[k]["DATA_TYPE"].ToString())]));
            }



            Sb.AppendLine("</Page>");
            return Sb.ToString();
        }




        private static string PutSelectColumns(DataTable Dt, string s)
        {
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (s != "")
                {
                    s += ",\r\n";
                }
                s += "\t\t[" + R["name"].ToString() + "]";

            }
            return s;
        }

        public static string CreateBaseProcForTable(string Name)
        {
            StringBuilder Sb = new StringBuilder();
            Sb.AppendLine("Create Proc " + Name + "_Insert_sp ");
            DataTable Dt = PDAL.ReadDataTableNotCommand("select sys.columns.*,(select top(1) name  from sys.types where sys.types.system_type_id=sys.columns.system_type_id) name_type,(select is_primary_key from sys.indexes where sys.indexes.object_id=sys.columns.object_id and index_id=column_id ) is_primary_key from sys.columns,sys.objects where sys.columns.object_id=sys.objects.object_id and sys.objects.name='" + Name + "' and sys.objects.type='u'");
            string s = AllEditableColumns(Sb, Dt);
            Sb.AppendLine("as begin");
            Sb.AppendLine("insert into " + Name + "( ");
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",\r\n";
                    }

                    s += "\t\t" + R["Name"].ToString() + " ";


                }
            }

            Sb.AppendLine(s);
            Sb.AppendLine(") values (");
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",\r\n";
                    }

                    s += "\t\t@" + R["Name"].ToString() + " ";


                }
            }

            Sb.AppendLine(s);
            Sb.AppendLine(")");
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "True")
                {
                    s += "Select SCOPE_IDENTITY()";

                }
            }
            Sb.AppendLine(s);
            Sb.AppendLine("\r\nend\r\ngo");

            Sb.AppendLine("Create Proc " + Name + "_Update_sp ");
            s = "";
            s = AllColumns(Sb, Dt);

            Sb.AppendLine("as begin");
            Sb.AppendLine("Update  Top(1) " + Name + " set ");
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];
                if (R["is_identity"].ToString() == "False")
                {
                    if (s != "")
                    {
                        s += ",\r\n";
                    }

                    s += "\t\t[" + R["Name"].ToString() + "]=@" + R["Name"].ToString() + " ";


                }
            }



            Sb.AppendLine(s);
            Sb.AppendLine("where");
            s = WherePrimaryKeys(Dt, s);

            Sb.AppendLine(s);
            Sb.AppendLine(" \r\nend\r\ngo");

            Sb.AppendLine("Create Proc " + Name + "_Delete_sp ");
            s = PrimaryKeyParameter(Dt, s);
            Sb.AppendLine(s);
            Sb.AppendLine(" as begin");
            Sb.AppendLine("Delete Top(1) from " + Name + "\r\n   where\r\n");
            s = WherePrimaryKeys(Dt, s);
            Sb.AppendLine(s);
            Sb.AppendLine("\r\nend\r\ngo");

            Sb.AppendLine("Create Proc " + Name + "_SelectAll ");
            Sb.AppendLine(" as \n\n begin ");
            Sb.AppendLine("Select");
            s = PutSelectColumns(Dt, s);
            Sb.AppendLine(s);
            Sb.AppendLine("from " + Name);
            Sb.AppendLine(" end \r\ngo");
            Sb.AppendLine("Create Proc " + Name + "_SelectRow ");
            s = PrimaryKeyParameter(Dt, s);
            Sb.AppendLine(s);
            Sb.AppendLine(" as \n\n begin ");
            Sb.AppendLine("Select Top(1)");
            s = PutSelectColumns(Dt, s);
            Sb.AppendLine(s);
            Sb.AppendLine("from " + Name);
            Sb.AppendLine("where ");
            s = "";
            s = WherePrimaryKeys(Dt, s);

            Sb.AppendLine(s);

            Sb.AppendLine(" end \r\ngo");
            Sb.AppendLine("Create Proc " + Name + "_Serach ");
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];

                if (s != "")
                {
                    s += ",\r\n";
                }

                s += "\t\t@" + R["Name"].ToString() + " " + R["name_type"].ToString();
                if (R["name_type"].ToString() == "nvarchar")
                {
                    s += "(max)";
                }
                s += " ";

            }





            Sb.AppendLine(s);
            Sb.AppendLine(" as begin");
            Sb.AppendLine("Select ");
            s = PutSelectColumns(Dt, s);
            Sb.AppendLine(s);
            Sb.AppendLine("from " + Name + " ");
            Sb.AppendLine("where ");
            s = "";
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                DataRow R = Dt.Rows[k];


                if (R["name_type"].ToString() == "nvarchar")
                {
                    if (s != "")
                    {
                        s += "\r\n and \t\t ";
                    }
                    s += "(" + R["name"] + " like '%'+ @" + R["name"] + " + '%' )";
                }
                if (R["name_type"].ToString() == "datetime")
                {
                    if (s != "")
                    {
                        s += "\r\n and \t\t ";
                    }
                    s += "(" + R["Name"] + "=@" + R["Name"] + ")";
                }
                if ((R["name_type"].ToString() == "int") || (R["name_type"].ToString() == "bigint") || (R["name_type"].ToString() == "float") || (R["name_type"].ToString() == "decimal"))
                {
                    if (s != "")
                    {
                        s += "\r\n and \t\t ";
                    }
                    s += "((" + R["Name"] + "=@" + R["Name"] + " or  @" + R["Name"] + "=-1 )";
                    s += "\r\nor (" + R["Name"] + " is null  " + " and @" + R["Name"] + "=-1 ))";
                }
                if ((R["name_type"].ToString() == "tinyint"))
                {
                    if (s != "")
                    {
                        s += "\r\n and \t\t ";
                    }
                    s += "((" + R["Name"] + "=@" + R["Name"] + ")";

                }
                s += " ";

            }
            Sb.AppendLine(s);
            Sb.AppendLine("end\r\n");
            
            return Sb.ToString();



        }


        public static Dictionary<string, Page> PageAccess = new Dictionary<string, Page>();
        public static Dictionary<string, action> actionAccess = new Dictionary<string, action>();
        public static bool loaded = false;
        public static string ApplicationTitle = "";
        public static string ApplicationName = "";
        public static string MenuTitle = "";
        public static Application App = null;
        public static List<string> ReadCommands = new List<string>();
        public static List<string> ExecCommands = new List<string>();
        public static List<string> dontBeBuild = new List<string>();
        private static void BuildFile(string TempFile, string Output)
        {
            int i = PDAL.dontBeBuild.IndexOf(Path.GetFileName(Output));
            if (i == -1)
            {
                Template Temp = Template.Parse(System.IO.File.ReadAllText(MapPath(TempFile)));
                System.IO.File.WriteAllText(MapPath(Output), Temp.Render(Hash.FromAnonymousObject(new { App = PDAL.App })), System.Text.UTF8Encoding.UTF8);
            }
        }
        public static  string MapPath(string path)
        {
            return HttpContext.Current.Server.MapPath(path);

        }
        public static Page FindPage(string name)
        {
            return PDAL.PageAccess[name];

        }
        public static string GetSession(string key)
        {
            if (HttpContext.Current.Session[key] != null)
            {
               return   HttpContext.Current.Session[key].ToString();


            }
            else
            {
                return "";
            }
        }
        public static string DataTableToJson(DataTable Dt, int StatusCode, string Message)
        {
            /*
             * "{"Status":"500","Message":"","Record":[{"id":"damn","name":"adsadas'sadaasd"},{"id":"yes"}],"name":"xxx"}"
             * /
            
             */
            StringBuilder S = new StringBuilder();
            S.Append("{\"Status\":\"" + StatusCode + "\",\"Message\":\"" + Message + "\",\"Records\":[");
            for (int k = 0; k < Dt.Rows.Count; k++)
            {
                S.Append("{");
                for (int q = 0; q < Dt.Columns.Count; q++)
                {
                    if (q != 0)
                    {
                        S.Append(",");
                    }
                    if (Dt.Columns[q].DataType != typeof(DateTime))
                    {
                        S.Append("\"" + Dt.Columns[q].ColumnName + "\":\"" + Dt.Rows[k][q].ToString().Replace("\n", "\\n").Replace("\\", "\"") + "\"");
                    }
                    else
                    {
                        if (Dt.Rows[k][q].ToString() != "")
                        {
                            S.Append("\"" + Dt.Columns[q].ColumnName + "\":\"" + Convertor.MilToPerDate((DateTime)Dt.Rows[k][q]) + "\"");

                        }
                        else
                        {
                            S.Append("\"" + Dt.Columns[q].ColumnName + "\":\""  + "\"");

                        }
                    }
                }
                S.Append("}");
                if (k != Dt.Rows.Count - 1)
                {
                    S.Append(",");
                }
            }
            S.Append("]");
            S.Append("}");
            return S.ToString();
        }
        public static string GetSpecValue(string key)
        {
            switch (key)
            {
                case "CurrentDateTime":
                    return DateTime.Now.ToString();
                    break;
                case "RandomToken":
                    return new System.Guid().ToString();
                    break;
                default:
                    throw new Exception("عبارت ناشناخته");
                    break;
            }
        }
        public static SqlConnection GetConnection()
        {
            SqlConnection Con = new SqlConnection(PDAL.App.ConnectionSetthing);
            Con.Open();

            return Con;
        }
        public static string ExecScaller(ref string Command, List<inputParameter> paras)
        {
            SqlCommand Com = Util.InitCommanD(ref Command, paras, GetConnection()); ;
         
           for (int k = 0; k < paras.Count; k++)
           {
               if (paras[k].value == null)
               {
                   Com.Parameters.AddWithValue(paras[k].key, DBNull.Value);
               }
               else
               {
                   Com.Parameters.AddWithValue(paras[k].key, paras[k].value);
               }
           }
         object r=   Com.ExecuteScalar();
           Com.Connection.Close();
           return (r == null ? "" : r.ToString()) ;
        }
        public static string ExecScallerWithConnection(ref string Command, List<inputParameter> paras,SqlConnection Con,SqlTransaction Tran)
        {
            SqlCommand Com = Util.InitCommanD(ref Command, paras,Con); ;
            Com.Transaction = Tran;
         
            for (int k = 0; k < paras.Count; k++)
            {
                if (paras[k].value == null)
                {
                    Com.Parameters.AddWithValue(paras[k].key, DBNull.Value);
                }
                else
                {
                    Com.Parameters.AddWithValue(paras[k].key, paras[k].value);
                }
            }
            object r = Com.ExecuteScalar();
             
            return (r == null ? "" : r.ToString());
        }



        public static DataTable  ReadRecords(ref string Command, List<inputParameter> paras)
        {
            SqlCommand Com = Util.InitCommanD(ref Command, paras, GetConnection()); ;
          
            if (paras == null)
            {
                paras = new List<inputParameter>();

            }
            for (int k = 0; k < paras.Count; k++)
            {
                if (paras[k].value == null)
                {
                    Com.Parameters.AddWithValue(paras[k].key, DBNull.Value);
                }
                else
                {
                    Com.Parameters.AddWithValue(paras[k].key, paras[k].value);
                }
            }
            DataTable Records = new DataTable();
            SqlDataAdapter Da = new SqlDataAdapter(Com);
            Da.Fill(Records);
            Com.Connection.Close();
            return Records;
        }
        public static void ConvertValuesBatch(Page page,Command Com, inputParameter[][] Paras)
        {
         //   for (int k = 0; k < Paras.Count; k++)
         //   {
         //       if (Paras[k].value != "")
         //       {
         //           PageParameter PP = page.DicPageParameters[Paras[k].key];
         //           if (PP.type == "Date")
         //           {
         //               Paras[k].value = Convertor.PerDateToMilDate(Paras[k].value);
         //
         //           }
         //           if (PP.type == "CheckBox")
         //           {
         //               Paras[k].value = Convertor.CheckBoxToBit(Paras[k].value);
         //           }
         //           if (PP.type == "Money")
         //           {
         //               Paras[k].value = Convertor.MoneyToInteger(Paras[k].value);
         //           }
         //       }
         //
         //   }
            for (int k = 0; k < Com.Parameters.Count; k++)
            {

                string DefaultType = Com.Parameters[k].DefaultValueSource;

                if (Com.Parameters[k].sourceType == "PageParameter")
                {
                    PageParameter PP = page.DicPageParameters[Com.Parameters[k].sourceTypeParameter];
                    int index = -1;
                    for (int k2 = 0; k2 < Math.Min(2, Paras.Length); k2++)
                    {
                        for(int k3=0;k3<Paras[k2].Length;k3++)
                        {
                            if (Paras[k2][k3].key == PP.name)
                            {
                                index = k3;

                            }

                        }
                        

                    }
                    if (index == -1)
                    {
                        continue;

                    }
                         if (PP.type == "Date")
                         {
                             for (int row = 1; row < Paras.Length; row++)
                             {

                                 Paras[row][index].value = Convertor.PerDateToMilDate(Paras[row][index].value);
                             }
               
                
                         }
                         if (PP.type == "CheckBox")
                         {
                             
                             for (int row = 1; row < Paras.Length; row++)
                             {

                                 Paras[row][index].value = Convertor.CheckBoxToBit(Paras[row][index].value);
                             }
                         }
                         if (PP.type == "Money")
                         {
                       

                             for (int row = 1; row < Paras.Length; row++)
                             {

                                 Paras[row][index].value = Convertor.MoneyToInteger(Paras[row][index].value);
                             }
                         }
                         if (DefaultType == "Static")
                         {

                             for (int row = 1; row < Paras.Length; row++)
                             {
                                 if (Paras[row][index].value == null)
                                 {
                                     Paras[row][index].value = Com.Parameters[k].DefaultValueParameter;
                                 }
                              
                             }

                         }
                         if (DefaultType == "NULL")
                         {

                             for (int row = 1; row < Paras.Length; row++)
                             {
                                 if (Paras[row][index].value == null)
                                 {
                                     Paras[row][index].value = null;
                                 }

                             }

                         }
                         if (DefaultType == "Session")
                         {

                             for (int row = 1; row < Paras.Length; row++)
                             {
                                 if (Paras[row][index].value == null)
                                 {
                                     Paras[row][index].value = GetSession(Com.Parameters[k].DefaultValueParameter);
                                 }

                             }

                         }
                         if (DefaultType == "SpecValue")
                         {

                             for (int row = 1; row < Paras.Length; row++)
                             {
                                 if (Paras[row][index].value == null)
                                 {
                                     Paras[row][index].value = GetSpecValue(Com.Parameters[k].DefaultValueParameter);
                                 }

                             }

                         }

                }
                if (Com.Parameters[k].sourceType == "Row")
                {
                    int index = -1;
                    string ColumnName = Com.Parameters[k].sourceTypeParameter;
                    string typ="";
                    for (int c1 = 0; c1 < page.tables[0].columns.Count; c1++)
                    {
                        if (page.tables[0].columns[c1].name == ColumnName)
                        {
                            typ = page.tables[0].columns[c1].type;

                        }

                    }


                    
                    for (int k2 = 0; k2 < Math.Min( 2,Paras.Length ) ; k2++)
                    {
                        for (int k3 = 0; k3 < Paras[k2].Length; k3++)
                        {
                            if (Paras[k2][k3].key == Com.Parameters[k].sourceTypeParameter)
                            {
                                index = k3;

                            }

                        }

                    }
                    if (index == -1)
                    {
                        continue;

                    }
                    if (typ == "InputDate")
                    {
                        for (int row = 1; row < Paras.Length; row++)
                        {

                            Paras[row][index].value = Convertor.PerDateToMilDate(Paras[row][index].value);
                        }


                    }
              
                    if (typ == "InputMoney")
                    {


                        for (int row = 1; row < Paras.Length; row++)
                        {

                            Paras[row][index].value = Convertor.MoneyToInteger(Paras[row][index].value);
                        }
                    }
                    if (DefaultType == "Static")
                    {

                        for (int row = 1; row < Paras.Length; row++)
                        {
                            if (Paras[row][index].value ==null)
                            {
                                Paras[row][index].value = Com.Parameters[k].DefaultValueParameter;
                            }

                        }

                    }
                    if (DefaultType == "NULL")
                    {

                        for (int row = 1; row < Paras.Length; row++)
                        {
                            if (Paras[row][index].value == null)
                            {
                                Paras[row][index].value = null;
                            }

                        }

                    }
                    if (DefaultType == "Session")
                    {

                        for (int row =1; row < Paras.Length; row++)
                        {
                            if (Paras[row][index].value == null)
                            {
                                Paras[row][index].value = GetSession(Com.Parameters[k].DefaultValueParameter);
                            }

                        }

                    }
                    if (DefaultType == "SpecValue")
                    {

                        for (int row = 1; row < Paras.Length; row++)
                        {
                            if (Paras[row][index].value == null)
                            {
                                Paras[row][index].value = GetSpecValue(Com.Parameters[k].DefaultValueParameter);
                            }

                        }

                    }
                }

            }

        }


    

        public static void ConvertValues(Page page, List<inputParameter> Paras)
        {
            Dictionary<string ,string > FileSended=null;
            if(HttpContext.Current.Session["FileSended"]!=null)
            {
                FileSended=(Dictionary<string ,string >)HttpContext.Current.Session["FileSended"];

            }
            for (int k = 0; k < Paras.Count; k++)
            {
                if (Paras[k].value != "")
                {
                    PageParameter PP = page.DicPageParameters[Paras[k].key];
                    if (PP.type == "Date")
                    {
                        Paras[k].value = Convertor.PerDateToMilDate(Paras[k].value);

                    }
                    if (PP.type == "FileInput")
                    {

                        Paras[k].value = FileSended[Paras[k].key];

                    }
                    if (PP.type == "CheckBox")
                    {
                        Paras[k].value = Convertor.CheckBoxToBit(Paras[k].value);
                    }
                    if (PP.type == "Money")
                    {
                        Paras[k].value = Convertor.MoneyToInteger(Paras[k].value);
                    }
                }

            }


        }
        public static List<inputParameter> lastParameters = new List<inputParameter>();
        public static Page PageInfo;
        public static object ComputeExpr(string Exp, List<inputParameter> Paras,Page PageInfo)
        {
          
            NCalc.Expression Ex = new NCalc.Expression(Exp);
            Ex.EvaluateFunction += Ex_EvaluateFunction;
            PDAL.PageInfo=PageInfo;
            PDAL.lastParameters = Paras;
            return Ex.Evaluate();

        }

        static void Ex_EvaluateFunction(string name, NCalc.FunctionArgs args)
        {
            if (name == "Para")
            {
                string key= args.Parameters[0].ParsedExpression.ToString().Replace("'","");
             string typ=    PageInfo.DicPageParameters[ key].type;
             string val = null;
             for (int k = 0; k < lastParameters.Count; k++)
             {
                 if (lastParameters[k].key == key)
                 {
                     val = lastParameters[k].value.ToString();

                 }

             }

             if ((typ == "String") || (typ == "TextArea") || (typ == "Html") || (typ == "DropDown") || (typ == "Select2") || (typ == "Select2Ajax"))
             {

                 args.Result = val;
             }
             if (typ == "Date")
             {
                 args.Result = DateTime.Parse(val);
             }
             if ((typ == "Integer") || (typ == "Float") || (typ == "Money") )
             {

                 args.Result =decimal.Parse(  val);
             }
               

            }
            return ;
        }
        public static string ValidateAndSetDefaultValue(Page page, List<inputParameter> Paras)
        {
            string error = "";
            for (int k = 0; k < Paras.Count; k++)
            {
                PageParameter PP = page.DicPageParameters[Paras[k].key];



                if (Paras[k].value == "")
                {
                    if (PP.DefaultValueSource == "Session")
                    {
                            
                             Paras[k].value = GetSession(PP.DefaultValueParameter);
                    }
                    else if (PP.DefaultValueSource == "SpecValue")
                    {

                        Paras[k].value = GetSpecValue(PP.DefaultValueParameter);


                    }
                    else if (PP.DefaultValueSource == "Expr")
                    {

                        Paras[k].value = PDAL.ComputeExpr(PP.DefaultValueParameter, Paras, page).ToString();


                    }
                    else if (PP.DefaultValueSource == "NULL")
                    {
                        Paras[k].value = null;

                    }
                    else if (PP.DefaultValueSource == "Static")
                    {
                        Paras[k].value = PP.DefaultValueParameter;

                    }
                }
                for (int l = 0; l < PP.ParameterChecks.Count; l++)
                {
                    
                    ParameterCheck PC = PP.ParameterChecks[l];
                    if ((PC.When != null) && (PC.When!=""))
                    {
                        if ((bool)PDAL.ComputeExpr(PC.When, Paras,page) == false)
                        {

                            continue;
                        }

                    }
                    if (PC.Cond == "Reg")
                    {
                        if ((PP.type == "String") || (PP.type == "TextArea") || (PP.type == "Select2") || (PP.type == "Select2Ajax"))
                        {
                            PDALEngine.Validator.CheckEmpty(Paras[k], ref error, PP.title);
                        }
                        if ((PP.type == "Date"))
                        {

                            PDALEngine.Validator.CheckDate(Paras[k], ref error, PP.title);

                        }
                        if ((PP.type == "Integer"))
                        {

                            PDALEngine.Validator.CheckNumberInt(Paras[k], ref error, PP.title);

                        }
                        if ((PP.type == "Float"))
                        {

                            PDALEngine.Validator.CheckNumberFloat(Paras[k], ref error, PP.title);

                        }
                    }
                    if (PC.Cond == "StringLength")
                    {
                        PDALEngine.Validator.CheckStringLength(Paras[k], ref error, PP.title,int.Parse(PC.Value));
                    }
                    if (PC.Cond == "RegEmail")
                    {
                        PDALEngine.Validator.CheckEmail(Paras[k], ref error, PP.title);
                    }
                }

            }
            for (int k = 0; k < page.CustomValidates.Count; k++)
            {
                if (!((bool)(PDAL.ComputeExpr(page.CustomValidates[k].Cond,Paras,page))))
                {
                    error += page.CustomValidates[k].Message + "-";

                }

            }


            return error;
        }
        public static List<inputParameter> SkipParameters(Page page, List<inputParameter> Paras)
        {
            List<inputParameter> result = new List<inputParameter>();
            for (int k = 0; k < Paras.Count; k++)
            {
                PageParameter PP = page.DicPageParameters[Paras[k].key];
                if (PP.dontSendToDb != "Yes")
                {
                    result.Add(Paras[k]);
                }
            }
            return result;
        }


        public static void InitServerSideParametersForSubmit(string PageName, ref List<inputParameter> paras)
        {
            Page Page = FindPage(PageName);
            for (int k = 0; k < Page.PageParameters.Count; k++)
            {
                PageParameter P = Page.PageParameters[k];
                if (P.source == "Session")
                {
                    inputParameter i = new inputParameter();
                    i.key = P.name;
                    i.value = GetSession(P.sorurceParameter);
                    paras.Add(i);
                }
                else if (P.source == "SpecValue")
                {
                    inputParameter i = new inputParameter();
                    i.key = P.name;
                    i.value = GetSpecValue(P.sorurceParameter);
                    paras.Add(i);

                }
            }


        }
        public static XmlNode GetElement(XmlDocument doc, string tagName)
        {
            XmlNodeList elements = doc.GetElementsByTagName(tagName);
            if (elements.Count == 0)
            {
                throw new Exception("هیچ عنصری یافت نشد" + tagName);

            }
            if (elements.Count > 1)
            {
                throw new Exception("بیشتر از یک عناصر یافت شد" + tagName);

            }
            return elements[0];
        }
        public static void load()
        {
            dontBeBuild.Clear();
            XmlDocument XmlDoc = new XmlDocument();
            XmlDoc.LoadXml(System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~\\PDA.Config")));
     
            XmlNode el = GetElement(XmlDoc, "Application");
            Application Ap = new Application();
            Ap.ParseEle(el);
            for (int k = 0; k < Ap.DontBuilds.Count; k++)
            {
                dontBeBuild.Add(Ap.DontBuilds[k].FileName);

            }


            App = Ap;
            loaded = true;
            for (int k = 0; k < PDAL.App.Pagess.Count; k++)
            {
                for (int l = 0; l < PDAL.App.Pagess[k]._Pages.Count; l++)
                {

                    PDAL.PageAccess[PDAL.App.Pagess[k]._Pages[l].name] = PDAL.App.Pagess[k]._Pages[l];
                }

            }
        }
        public class TableInfo
        {
            public string[] ColumnNames;
            public string[,] Values;
            public string Message;
            public int  code = 0;
            public TableInfo(DataTable Dt)
            {
                if (Dt == null)
                {
                    return;
                }
                ColumnNames = new string[Dt.Columns.Count];
                for (int k = 0; k < Dt.Columns.Count; k++)
                {
                    ColumnNames[k] = Dt.Columns[k].ColumnName;

                }
                Values = new string[Dt.Rows.Count, Dt.Columns.Count];
                for (int r = 0; r < Dt.Rows.Count; r++)
                {
                    for (int c = 0; c < Dt.Columns.Count; c++)
                    {
                        Values[r, c] = Dt.Rows[r][c].ToString();
                    }

                }

            }

        }
        public static void BuildScripts()
        {
            if (PDAL.dontBeBuild.IndexOf("config.js") == -1)
            {
                BuildFile("~\\BuildLigid\\scripts\\config.js", "~\\builded\\scripts\\config.js");
            }
                Template T= GetTemplate(MapPath("~\\BuildLigid\\scripts\\controller.js"));
            for (int k = 0; k < PDAL.App.Pagess.Count; k++)
            {
                for (int L = 0; L < PDAL.App.Pagess[k]._Pages.Count; L++)
                {
                    int index = PDAL.dontBeBuild.IndexOf(PDAL.App.Pagess[k]._Pages[L].name + ".js");
                    if (index == -1)
                    {
                        File.WriteAllText(MapPath("~\\builded\\scripts\\controllers\\" + PDAL.App.Pagess[k]._Pages[L].name + ".js"), T.Render(Hash.FromAnonymousObject(new { Page = PDAL.App.Pagess[k]._Pages[L] })), System.Text.UTF8Encoding.UTF8);
                    }
                }
            }


            if (PDAL.dontBeBuild.IndexOf("AjaxActions.js") == -1)
            {
                BuildFile("~\\BuildLigid\\scripts\\AjaxActions.js", "~\\builded\\scripts\\AjaxActions.js");
            }
        }
        public static void BuildPages()
        {
            
            System.IO.FileInfo[] D = new System.IO.DirectoryInfo(MapPath("~\\BuildLigid\\Pages")).GetFiles("*.html");
            Template.FileSystem = new DotLiquid.FileSystems.LocalFileSystem(MapPath("~\\BuildLigid\\Pages"));
            Dictionary<string, Template> Temps = new Dictionary<string, Template>();
            foreach (var F in D)
            {
                Template te = GetTemplate(F.FullName);
                Temps.Add(System.IO.Path.GetFileNameWithoutExtension(F.Name), te);

            }
            for (int q = 0; q < App.Pagess.Count; q++)
            {
                for (int l = 0; l < App.Pagess[q]._Pages.Count; l++)
                {
                    int index = PDAL.dontBeBuild.IndexOf(PDAL.App.Pagess[q]._Pages[l].name + ".html");
                    if (index == -1)
                    {
                        System.IO.File.WriteAllText(MapPath("~\\Builded\\Pages\\") + App.Pagess[q]._Pages[l].name + ".html", Temps[App.Pagess[q]._Pages[l].type].Render(Hash.FromAnonymousObject(new { Page = App.Pagess[q]._Pages[l] })), System.Text.UTF8Encoding.UTF8);
                    }
                }
            }
            
        }
        public static Template GetTemplate(string FileName)
        {
            Template Tm = Template.Parse(System.IO.File.ReadAllText((FileName)));
            return Tm;

        }
        public static void  BuildApp()
        {
            BuildScripts();
            BuildPages();
        }
    }
}