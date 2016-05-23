<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="inGame.aspx.cs" Inherits="ProfessorOak.inGame" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    
    <body onload="init()">
	</body>
    <div class="jumbotron">
 
        <canvas id="background" width="1000px" height="1000px" style="border:1px solid #000000;">

        </canvas> 
        <asp:Literal ID="LiteralSpecial" runat="server"></asp:Literal>

    </div>
</asp:Content>
