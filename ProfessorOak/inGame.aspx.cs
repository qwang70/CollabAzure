using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;


using System.Threading.Tasks;
using System.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IO;

namespace ProfessorOak
{
    public partial class inGame : System.Web.UI.Page
    {
        Hero heroGame;

        private string nickname;
        private int churn = 0;

        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["hero"]!=null && Session["hero"].GetType().Name.CompareTo("Hero") == 0)
            {
                heroGame = (Hero)Session["hero"];
            }
            else
            {
                heroGame = new Hero();
            }
        }

        [WebMethod]
        [System.Web.Script.Services.ScriptMethod]
        public static void testPage()
        {
            System.Diagnostics.Debug.Write("getin");
        }

        [WebMethod]
        [System.Web.Script.Services.ScriptMethod]
        public static string MyMethod()
        {
            return "Hello";
        }

    }
}