FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY ["fantasy-hoops.csproj", "fantasy-hoops/"]
RUN dotnet restore "fantasy-hoops/fantasy-hoops.csproj"
COPY . .
WORKDIR "/src/fantasy-hoops"
COPY . .
RUN dotnet build "fantasy-hoops.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "fantasy-hoops.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "fantasy-hoops.dll"]