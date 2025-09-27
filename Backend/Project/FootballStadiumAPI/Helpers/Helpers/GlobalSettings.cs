using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIBusiness
{
    public static class GlobalSettings
    {
        public static IConfiguration Configuration { get; set; }
    }

}
