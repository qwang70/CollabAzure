<%@ Page Title="Welcome" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ProfessorOak._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    
    <asp:MultiView ID="MultiView1"  runat="server">
         <asp:View ID="Welcome" runat="server">
            <div class="jumbotron">
                <img src="Asset/damu/logo.png" width="220px" align="right" />
                <font face="Comic sans MS"><h2>Game Rule:</h2>
                <p class="lead">Just guess what Pokemon Professor Oak might choose.<br>
                    GAME OVER when the player gets negative points, OR the player gets TIRED of the game.<br>
                    Enjoy!
                </p>
                    </font>
            </div>
             <br />
                <center>
                    <!--remember to add on click-->
                    <asp:Button ID="Gallery" runat="server" class="btn btn-warning disabled btn-lg" Text="&nbsp;&nbsp;Gallery&nbsp;&nbsp;"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="NewGame" runat="server" class="btn btn-warning btn-lg" Text="New Game" OnClick="NewGame_Click"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="LoadGame" runat="server" class="btn btn-warning btn-lg" Text="Load Game"/>
                </center>
         </asp:View>

        <!--Register-->
         <asp:View ID="View1" runat="server">
             <div class="jumbotron" style="font-size: x-large">
                  <div class="row">
                    <div class="col-md-6">
                       <div class="form-group">
                                <label class="control-label" for="focusedInput">NickName</label>
                                <asp:TextBox class="form-control input-lg" id="nicknameInput" runat="server"/>

                            </div>

                            <div class="form-group">
                                <label class="control-label" for="focusedInput">Age</label>
                                <asp:TextBox class="form-control input-lg" id="ageInput" runat="server"/>
                                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" ControlToValidate="ageInput" runat="server"
                                     ErrorMessage="Only Numbers allowed" ValidationExpression="\d+"></asp:RegularExpressionValidator>

                            </div>

                            <div class="form-group">
                                <label class="control-label" for="focusedInput">Current Mode</label><br />
                                 &nbsp;&nbsp;<asp:RadioButtonList ID="rbtLstRating" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" value="n0p0" Selected></asp:ListItem>
                                <asp:ListItem  text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" value="n0p1"></asp:ListItem>
                                <asp:ListItem  text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" value="n1p0"></asp:ListItem>
                                <asp:ListItem text=""  value="n1p1"></asp:ListItem>
                                     </asp:RadioButtonList><br />
                                <img src="Asset/mode/n0p0.jpg" width="50px"/>&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src="Asset/mode/n0p1.jpg" width="50px"/>&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src="Asset/mode/n1p0.jpg" width="50px"/>&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src="Asset/mode/n1p1.jpg" width="50px"/><br />
                            </div>
                        <!--Remember to onclick-->
                        <asp:Button runat="server" class="btn btn-primary btn-lg" id="fixstart" OnClick="StartGame_Click" Text="Start Game" />

                        </div>
                    <div class="col-md-6" style="text-align:center">
                        <br /><br /><br /><br />
                        <h2>Go Annoymous
                        </h2>
                        <!--Remember to onclick-->
                        <asp:Button runat="server" class="btn btn-primary btn-lg" OnClick="RandomGame_Click" Text="Randomize Character" />
                    </div>
                </div>
            </div>
         </asp:View>

        <!--LoadFakeInfo-->
         <asp:View ID="View2" runat="server">
         </asp:View>
        
        <!--LoadFakeInfo-->
         <asp:View ID="View3" runat="server">
             <div class="jumbotron">
                 <!--
                 <canvas id="myCanvas" width="1000px" height="1000px" style="border:1px solid #000000;">

                 </canvas> 
                -->
             </div>
         </asp:View>
    </asp:MultiView>

    <div class="row">
        <div class="col-md-4">
            <h2>Getting started</h2>
            <p>
                ASP.NET Web Forms lets you build dynamic websites using a familiar drag-and-drop, event-driven model.
            A design surface and hundreds of controls and components let you rapidly build sophisticated, powerful UI-driven sites with data access.
            </p>
            <p>
                <a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301948">Learn more &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Get more libraries</h2>
            <p>
                NuGet is a free Visual Studio extension that makes it easy to add, remove, and update libraries and tools in Visual Studio projects.
            </p>
            <p>
                <a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301949">Learn more &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Web Hosting</h2>
            <p>
                You can easily find a web hosting company that offers the right mix of features and price for your applications.
            </p>
            <p>
                <a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301950">Learn more &raquo;</a>
            </p>
        </div>
    </div>

</asp:Content>
