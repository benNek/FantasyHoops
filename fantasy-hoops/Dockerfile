#Build
FROM microsoft/aspnetcore-build:1.0-2.0 AS build-env
COPY src /app
WORKDIR /app
RUN ["dotnet", "restore", "fantasy-hoops.sln"]
RUN set -ex; \
	if ! command -v gpg > /dev/null; then \
		apt-get update; \
		apt-get install -y --no-install-recommends \
			gnupg2 \
			dirmngr \
		; \
		rm -rf /var/lib/apt/lists/*; \
	fi && curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get update && apt-get install -y build-essential nodejs

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out fantasy-hoops.sln

#Runtime 
FROM microsoft/aspnetcore:2.0.0

WORKDIR /app
COPY --from=build-env /app/fantasy-hoops.Web/out ./
ENTRYPOINT ["dotnet", "fantasy-hoops.Web.dll"]