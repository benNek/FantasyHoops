using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace fantasy_hoops.Helpers
{
    public class CommonFunctions
    {
        public static HttpWebResponse GetResponse(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.KeepAlive = true;
                request.ContentType = "application/json";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                return response;

            }
            catch (WebException)
            {
                return null;
            }
        }

        public static string ResponseToString(HttpWebResponse response)
        {
            string resp = "";
            using (StreamReader sr = new StreamReader(response.GetResponseStream()))
            {
                resp = sr.ReadToEnd();
            }
            return resp;
        }
    }
}
