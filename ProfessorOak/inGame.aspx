<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="inGame.aspx.cs" Inherits="ProfessorOak.inGame" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        		<style>
			canvas {				position: absolute;
			}
			#background {
				z-index: -2;
			}
			#pokemon {
				z-index: -1;
			}
			#pokeball {
				z-index: 0;
			}
		</style>

    </header>
    <body onload="newGame()">
	</body>

    <div class="huabu">
        <canvas id="background" width="800px" height="480px  style="border:1px solid #000000;" >
			Your browser does not support canvas. Please try again with a different browser.
		</canvas>
		<!-- The canvas for all enemy ships and bullets -->
		<canvas id="pokeball" width="800px" height="480px">
		</canvas>
		<!-- The canvas the ship uses (can only move up
         one forth the screen.) -->
		<canvas id="pokemon" width="800px" height="480px">
		</canvas> 

    </div>
</asp:Content>
