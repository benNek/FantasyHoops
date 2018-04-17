using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class PhotosSeed
    {
        const string photosDir = "./ClientApp/content/images/players/";
        const string logosDir = "./ClientApp/content/images/logos/";

        public async static Task Initialize(GameContext context)
        {
            await ExtractLogos(context);
            await ExtractPlayerPhotos(context);
        }

        private async static Task ExtractLogos(GameContext context)
        {
            if (!Directory.Exists(logosDir))
                Directory.CreateDirectory(logosDir);

            foreach (var team in context.Teams)
            {
                string teamAbbr = team.Abbreviation;
                string remoteFileUrl =
                    "http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/" + teamAbbr + ".svg";
                string localFileName = "./ClientApp/content/images/logos/" + teamAbbr + ".svg";
                await Task.Run(() => SavePhoto(localFileName, remoteFileUrl));
            }
        }

        private async static Task ExtractPlayerPhotos(GameContext context)
        {
            if (!Directory.Exists(photosDir))
                Directory.CreateDirectory(photosDir);

            foreach (var player in context.Players)
            {
                int personId = player.NbaID;
                string remoteFileUrl =
                    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png";
                string localFileName = "./ClientApp/content/images/players/" + personId + ".png";
                await Task.Run(() => SavePhoto(localFileName, remoteFileUrl));
            }
        }

        private static void SavePhoto(string localFile, string urlFile)
        {
            byte[] content;
            WebResponse response = CommonFunctions.GetResponse(urlFile);
            if (response == null)
                return;
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

        private static bool NeedDownload(string localFile, byte[] urlBytes)
        {
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