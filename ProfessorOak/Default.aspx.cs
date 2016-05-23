using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IO;
using System.Data.SqlClient;
using System.Web.Services;

namespace ProfessorOak
{
    public class StringTable
    {
        public string[] ColumnNames { get; set; }
        public string[,] Values { get; set; }
    }
    
    public partial class _Default : System.Web.UI.Page
    {
        private string nickname;
        private int age     =30;
        private int negT    =0;
        private int posT    =0;
        private int duration=0;
        private int currency=1000;
        private int churn   =0;
        private int weapon  =1;
        private int rank    =200;
        private int interdays=1;

        private HttpResponseMessage response;
        private string responseString;


        protected void Page_Load(object sender, EventArgs e)
        {

            /*works
            String csname1 = "PopupScript";
            String csname2 = "ButtonClickScript";
            Type cstype = this.GetType();

            // Get a ClientScriptManager reference from the Page class.
            ClientScriptManager cs = Page.ClientScript;

            // Check to see if the startup script is already registered.
            if (!cs.IsStartupScriptRegistered(cstype, csname1))
            {
                String cstext1 = "alert('Hello World');";
                cs.RegisterStartupScript(cstype, csname1, cstext1, true);
            }

            // Check to see if the client script is already registered.
            if (!cs.IsClientScriptBlockRegistered(cstype, csname2))
            {
                StringBuilder cstext2 = new StringBuilder();
                cstext2.Append("<script type=\"text/javascript\"> function DoClick() {");
                cstext2.Append("Form1.Message.value='Text from client script.'} </");
                cstext2.Append("script>");
                cs.RegisterClientScriptBlock(cstype, csname2, cstext2.ToString(), false);
            }
            
            
            // Define the name, type and url of the client script on the page.
            String csname = "GameArea";
            String csurl = "~/test.js";
            Type cstype = this.GetType();

            // Get a ClientScriptManager reference from the Page class.
            ClientScriptManager cs = Page.ClientScript;

            // Check to see if the include script exists already.
            if (!cs.IsClientScriptIncludeRegistered(cstype, csname))
            {
                cs.RegisterClientScriptInclude(cstype, csname, ResolveClientUrl(csurl));
            }*/
            
            MultiView1.ActiveViewIndex = 0;
        }

        private void Page_Error(object sender, EventArgs e)
        {
            // Get last error from the server.
            Exception exc = Server.GetLastError();

            // Handle specific exception.
            if (exc is InvalidOperationException)
            {
                // Pass the error on to the error page.
                Server.Transfer("ErrorPage.aspx?handler=Page_Error%20-%20Default.aspx",
                    true);
            }
        }

        protected void NewGame_Click(object sender, EventArgs e)
        {
            MultiView1.ActiveViewIndex = 1;
        }

        protected void StartGame_Click(object sender, EventArgs e)
        {
            if (nicknameInput.Text != null && (nicknameInput.Text is String))
                this.nickname = nicknameInput.Text;
            else
                this.nickname = "Annoymous Pikachu";

            if (ageInput.Text != "" )
                this.age = Convert.ToInt32(ageInput.Text);
            else
                this.nickname = "Annoymous Pikachu";


            Hero item = null;

            item = new Hero(nickname, age, negT, posT, duration, currency, weapon, rank, interdays);
            item.GameTime = DateTime.Now.ToUniversalTime();

           // Session["hero"] = item;
            
            MultiView1.ActiveViewIndex = 3;

            // Predict whether customer will churn
            InvokeRequestResponseService(item).Wait();


            if (this.churn == 1)
            {
                LiteralSpecial.Text = "Congratulations, you found the ultimate helmet! <BR> Using this, you won the fight!";
                
            }
            else
            {
                LiteralSpecial.Text = "The monster is too powerful. You lost!";
                

            }
        }
        protected void RandomGame_Click(object sender, EventArgs e)
        {
            Hero item = null;

            item = new Hero();
            item.GameTime = DateTime.Now.ToUniversalTime();

            //Session["hero"] = item;

            MultiView1.ActiveViewIndex = 3;

            InvokeRequestResponseService(item).Wait();


            if (this.churn == 1)
            {
                LiteralSpecial.Text = "Congratulations, you found the ultimate helmet! <BR> Using this, you won the fight!";

            }
            else
            {
                LiteralSpecial.Text = "The monster is too powerful. You lost!";
            }
        }

        protected void Mode_Select(object sender, EventArgs e)
        {
            if (rbtLstRating.SelectedIndex == 0)
            {
                this.negT = 0;
                this.posT = 0;
            }
            else if (rbtLstRating.SelectedIndex == 1)
            {
                this.negT = 0;
                this.posT = 1;
            }
            else if (rbtLstRating.SelectedIndex == 2)
            {
                this.negT = 1;
                this.posT = 0;
            }
            else if (rbtLstRating.SelectedIndex == 3)
            {
                this.negT = 1;
                this.posT = 1;
            }
        }

        [WebMethod]
        [System.Web.Script.Services.ScriptMethod]
        public static void testPage()
        {
            System.Diagnostics.Debug.Write("getin");
        }

        [WebMethod]
        public async Task InvokeRequestResponseService(Hero hero)
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

                    System.Diagnostics.Debug.Write("scoreProb:\t{0,8:c}" + scoreProb);

                    //  Indicate whether the user churn
                    if (label == 1)
                        this.churn = 1;
                    else
                        this.churn = 0;

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
     
     