using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Database
{
    public class PhotosSeed
    {
        static HttpWebResponse responseAPI = GetResponse("http://data.nba.net/10s/prod/v1/2017/players.json");
        static string playersAPI = ResponseToString(responseAPI);
        const string photosDir = "./ClientApp/content/images/players/";

        public async static Task Initialize()
        {
            if (!Directory.Exists(photosDir))
                Directory.CreateDirectory(photosDir);

            using (var context = new GameContext())
            {
                foreach (var player in context.Players)
                {
                    int personId = player.NbaID;
                    string remoteFileUrl =
                        "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png";
                    string localFileName = "./ClientApp/content/images/players/" + personId + ".png";
                    try
                    {
                        await Task.Run(() => SavePhoto(localFileName, remoteFileUrl));
                    }
                    catch (WebException)
                    {
                        continue;
                    }
                }
            }
        }

        private static void SavePhoto(string localFile, string urlFile)
        {
            byte[] content;
            WebResponse response = GetResponse(urlFile);
            Stream stream = response.GetResponseStream();
            using (BinaryReader br = new BinaryReader(stream))
            {
                content = br.ReadBytes(500000);
                br.Close();
            }
            response.Close();

            if (!NeedDownload(localFile, content))
                return;

            FileStream fs = new FileStream(localFile, FileMode.Create);
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

        private static bool NeedDownload(string localFile, byte[] urlBytes)
        {
            System.Console.WriteLine(localFile);
            if (!File.Exists(localFile))
                return true;

            byte[] localFileBytes = File.ReadAllBytes(localFile);
            if (localFileBytes.Length != urlBytes.Length)
                return true;

            if (localFileBytes.SequenceEqual(urlBytes))
                return false;

            return false;
        }
    }
}
