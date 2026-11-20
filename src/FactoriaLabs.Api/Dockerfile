# ---- build ----
FROM mcr.microsoft.com/dotnet/sdk:11.0 AS build
WORKDIR /src

COPY FactoriaLabs.Api.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# ---- runtime ----
FROM mcr.microsoft.com/dotnet/aspnet:11.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_RUNNING_IN_CONTAINER=true

EXPOSE 8080

COPY --from=build /app/publish .

# Directorio de datos con el dueño correcto para que el volumen escriba como APP_UID.
RUN mkdir -p /app/data && chown -R $APP_UID /app/data

USER $APP_UID

ENTRYPOINT ["dotnet", "FactoriaLabs.Api.dll"]
