<%@ Page Title="Welcome" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ProfessorOak._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:MultiView ID="MultiView1"  runat="server">
         <asp:View ID="Welcome" runat="server">
             <header>
        
             </header>
           
            <div class="jumbotron">
                <img src="Asset/damu/logo.png" width="220px" align="right" />
                <font face="Comic sans MS"><h2>Game Rule:</h2>
                <p class="lead">Just guess what Pokemon Professor Oak might choose.<br>
                    Press [SPACE] to throw the pokemon ball.<br>
                    <br>
                    GAME OVER when the player couldn't get enough point, OR the player gets TIRED of the game.<br>
                    <br>
                    Enjoy!<br>
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
                    <asp:Button ID="LoadGame" runat="server" class="btn btn-warning btn-lg" Text="Load Game" OnClick="LoadGame_Click"/>
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
                                <label class="control-label" for="focusedInput">Recent Mode</label><br />
                                 &nbsp;&nbsp;
                                <asp:RadioButtonList ID="rbtLstRating" runat="server" 
                                    RepeatDirection="Horizontal" OnSelectedIndexChanged="Mode_Select">
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
                        <asp:Button runat="server" class="btn btn-primary btn-lg" id="fixstart" OnClick="StartGame_Click" Text="Start Game" postbackurl="~/inGame.aspx"/>

                        </div>
                    <div class="col-md-6" style="text-align:center">
                        <br /><br /><br /><br />
                        <h2>Go Annoymous
                        </h2>
                        <!--Remember to onclick-->
                        <asp:Button runat="server" class="btn btn-primary btn-lg" OnClick="RandomGame_Click" Text="Randomize Character" postbackurl="~/inGame.aspx" />
                    </div>
                </div>
            </div>
         </asp:View>

        <!--LoadFakeInfo-->
         <asp:View ID="View2" runat="server">
            <div class="jumbotron" style="font-size: x-large">
                  <div class="row">
                    <asp:Button ID="player1" runat="server" class="btn btn-default btn-lg btn-block" Text="Player: Pikachu   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       Saved 2 day before" OnClick="interday2" />
                    <asp:Button ID="player2" runat="server" class="btn btn-default btn-lg btn-block" Text="Player: Raichu     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      Saved 2 day before" OnClick="interday2"/>
                    <asp:Button ID="player3" runat="server" class="btn btn-default btn-lg btn-block" Text="Player: Dugtrio    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Saved 4 day before" OnClick="interday4"/>
                    <asp:Button ID="player4" runat="server" class="btn btn-default btn-lg btn-block" Text="Player: Charizard    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Saved 6 day before" OnClick="interday6"/>
                    <asp:Button ID="player5" runat="server" class="btn btn-default btn-lg btn-block" Text="Player: Chamander     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Saved 7 day before" OnClick="interday7"/>
                  </div>
             </div>
             
         </asp:View>
        
        <!--LoadFakeInfo-->
         
    </asp:MultiView>


</asp:Content>
