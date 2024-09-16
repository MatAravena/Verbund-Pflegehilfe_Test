using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;

namespace VPTesting
{
    public class CustimWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
    {
    }
}
