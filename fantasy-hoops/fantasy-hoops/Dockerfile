# FROM microsoft/aspnetcore:2.0 AS base
# WORKDIR /app
# EXPOSE 80

# FROM microsoft/aspnetcore-build:2.0 AS build
# WORKDIR /src
# COPY ["fantasy-hoops/fantasy-hoops.csproj", "fantasy-hoops/"]
# RUN dotnet restore "fantasy-hoops/fantasy-hoops.csproj"
# COPY . .
# WORKDIR "/src/fantasy-hoops"
# RUN dotnet build "fantasy-hoops.csproj" -c Release -o /app

# FROM build AS publish
# RUN dotnet publish "fantasy-hoops.csproj" -c Release -o /app

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app .
# ENTRYPOINT ["dotnet", "fantasy-hoops.dll"]

 # Sample contents of Dockerfile
 # Stage 1
 FROM microsoft/aspnetcore-build AS builder
 WORKDIR /source

 # caches restore result by copying csproj file separately
 COPY *.csproj .
 RUN dotnet restore

 # copies the rest of your code
 COPY . .
 RUN dotnet publish --output /app/ --configuration Release

 # Stage 2
 FROM microsoft/aspnetcore
 WORKDIR /app
 COPY --from=builder /app .
 ENTRYPOINT ["dotnet", "fantasy-hoops.dll"]