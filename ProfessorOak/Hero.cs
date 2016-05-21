using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

public class Hero
{
    
    public String nickname { get; set; }
    public DateTime GameTime { get; set; }
    public int age { get; set; }
    public int negT { get; set; }
    public int posT { get; set; }
    public int duration { get; set; }
    public int currency { get; set; }
    public int churn { get; set; }
    public int weapon { get; set; }
    public int rank { get; set; }
    public int interdays { get; set; }

    public Hero()
    {
        Random r = new Random();

        // Simulating it.
        this.nickname = "Annoymous Pikachu";
        this.age = r.Next(14, 80);
        this.negT = r.Next(0, 2);
        this.posT = r.Next(0, 2);
        this.duration = 0;
        this.currency = 0;
        this.churn = r.Next(0, 1);
        this.weapon = 1;
        this.rank = 200;
        this.interdays = 1;
    }
    public Hero(string nickname, int age, int negT, int posT, int duration, int currency, int weapon, int rank, int interdays)
    {

        // Simulating it.
        this.nickname = nickname;
        this.age = age;
        this.negT = negT;
        this.posT = posT;
        this.duration = duration;
        this.currency = currency;
        this.churn = 0;
        this.weapon = weapon;
        this.rank = rank;
        this.interdays = interdays;

        //Discussion: can we use session variable?
    }


    override public String ToString()
    {
        return this.nickname + "," + this.currency + "," + this.interdays;
    }
}
