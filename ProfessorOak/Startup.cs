using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ProfessorOak.Startup))]
namespace ProfessorOak
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
