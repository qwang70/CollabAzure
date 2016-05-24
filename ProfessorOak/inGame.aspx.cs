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
        static Hero heroGame;
        private static HttpResponseMessage response;
        private string nickname;
        static int churn = 0;

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
        public static string MyMethod(string name)
        {
            return "Hello"+name;
        }

        [WebMethod]
        [System.Web.Script.Services.ScriptMethod]
        public static int churnAnalysis(int c, int d)
        {
            heroGame.currency = c;
            heroGame.duration = d;

            System.Diagnostics.Debug.Write("currency: " + heroGame.currency);
            InvokeRequestResponseService(heroGame).Wait();
            return churn;
        }
        
        protected static async Task InvokeRequestResponseService(Hero hero)
        {

            string mlUri = ConfigurationManager.AppSettings["MLUri"];

            string apiKey = ConfigurationManager.AppSettings["MLExperimentKey"];

            using (var client = new HttpClient())
            {
                var scoreRequest = new
                {

                    Inputs = new Dictionary<string, StringTable>() {
                        {
                            "input1",
                            new StringTable()
                            {
                                ColumnNames = new string[] {"Age", "NegativeTweetLast30Days", "PositiveTweetLast30Days", "DurationMinutes", "TotalVirtualCurrency", "EndRank", "NewWeaponsAcquiredPerGame", "GameSessionInterArrivalDays", "Churn"},
                                Values = new string[,] {  { hero.age.ToString(), hero.negT.ToString(), hero.posT.ToString(), hero.duration.ToString(), hero.currency.ToString(), hero.rank.ToString(), hero.weapon.ToString(), hero.interdays.ToString(), hero.churn.ToString() },  }
                            }
                        },
                                        },
                    GlobalParameters = new Dictionary<string, string>()
                    {
                    }
                };



                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                client.BaseAddress = new Uri(mlUri);

                // WARNING: The 'await' statement below can result in a deadlock if you are calling this code from the UI thread of an ASP.Net application.
                // One way to address this would be to call ConfigureAwait(false) so that the execution does not attempt to resume on the original context.
                // For instance, replace code such as:
                //      result = await DoSomeTask()
                // with the following:
                //      result = await DoSomeTask().ConfigureAwait(false)


                response = await client.PostAsJsonAsync("", scoreRequest).ConfigureAwait(false);

                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                    dynamic jsonDe = JsonConvert.DeserializeObject(json);
                    JArray items = jsonDe.Results.output1.value.Values[0];

                    int label = Int32.Parse(items[9].ToString());
                    double scoreProb = Double.Parse(items[10].ToString());

                    System.Diagnostics.Debug.Write("scoreProb: " + scoreProb);

                    //  Indicate whether the user churn
                    if (label == 1)
                        churn = 1;
                    else
                        churn = 0;

                }
                else
                {
                    Console.WriteLine(string.Format("The request failed with status code: {0}", response.StatusCode));

                    // Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
                    Console.WriteLine(response.Headers.ToString());

                    string responseContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    Console.WriteLine(responseContent);

                }

            }
        }
    }
}