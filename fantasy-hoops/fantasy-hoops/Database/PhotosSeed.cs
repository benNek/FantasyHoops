using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace fantasy_hoops.Database
{
    public class PhotosSeed
    {

        public static async void LoadPlayerPhotoAsync(int id, GameContext context)
        {
            string remoteFileUrl =
                    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + id + ".png";
            string localFileName = "./ClientApp/content/images/players/" + id + ".png";
            try
            {
                await Task.Run(() => SavePhoto(localFileName, remoteFileUrl));
            }
            catch (WebException)
            {
                return;
            }
        }

        private static void SavePhoto(string localFile, string urlFile)
        {
            byte[] content;
            WebResponse response;
            try
            {
                response = GetResponse(urlFile);
            } catch(System.Net.WebException)
            {
                return;
            }
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
