using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Net;
using System.IO;

namespace fantasy_hoops.Database
{
    public class PhotosSeed
    {
        static HttpWebResponse responseAPI = GetResponse("http://data.nba.net/10s/prod/v1/2017/players.json");
        static string playersAPI = ResponseToString(responseAPI);

        public static void Initialize()
        {
            WebClient webClient = new WebClient();
            HttpClient client = new HttpClient();

            JObject json = JObject.Parse(playersAPI);
            JArray players = (JArray)json["league"]["standard"];
            foreach (JObject player in players)
            {
                string personId = (string)player["personId"];
                string remoteFileUrl =
                    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png";
                string localFileName = "./ClientApp/content/images/players/" + personId + ".png";
                try
                {
                    if (!File.Exists(localFileName))
                        SavePhoto(localFileName, remoteFileUrl);
                }
                catch (WebException)
                {
                    continue;
                }
            }
        }

        private static void SavePhoto(string fileName, string url)
        {
            byte[] content;
            WebResponse response = GetResponse(url);
            Stream stream = response.GetResponseStream();
            using (BinaryReader br = new BinaryReader(stream))
            {
                content = br.ReadBytes(500000);
                br.Close();
            }
            response.Close();

            FileStream fs = new FileStream(fileName, FileMode.Create);
            BinaryWriter bw = new BinaryWriter(fs);
            try
            {
                bw.Write(content);
            }
            finally
            {
                fs.Close();
                bw.Close();
            }
        }

        private static HttpWebResponse GetResponse(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.KeepAlive = true;
            request.ContentType = "application/json";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            return response;
        }

        private static string ResponseToString(HttpWebResponse response)
        {
            string stringResponse = "";
            using (StreamReader sr = new StreamReader(response.GetResponseStream()))
            {
                stringResponse = sr.ReadToEnd();
            }
            return stringResponse;
        }
    }
}
