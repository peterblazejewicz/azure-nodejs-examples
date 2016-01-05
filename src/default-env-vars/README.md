# Default Azure environment and configurations options

This project contains two simple NodeJS apps that outputs information about Azure default environment and configuration options for Web App and Web Job implemented with NodeJS.

To recreate output create new instance of Web App on Azure using default configuration application for NodeJS application with Git based deployment. Deploy server application. Then deploy web job task.

## Default configuration

### Server (Site)

```
  "_": [],
  "$0": "D:\\Program Files (x86)\\nodejs\\4.2.4\\node.exe D:\\home\\site\\wwwroot\\server.js",
  "APP_POOL_CONFIG": "C:\\DWASFiles\\Sites\\azuredefaultvars\\Config\\applicationhost.config",
  "APP_POOL_ID": "azuredefaultvars",
  "COMPUTERNAME": "RD000D3A208C7E",
  "PROCESSOR_ARCHITEW6432": "AMD64",
  "PUBLIC": "D:\\Users\\Public",
  "LOCALAPPDATA": "D:\\local\\LocalAppData",
  "AZURE_TOMCAT8_HOME": "D:\\Program Files (x86)\\apache-tomcat-8.0.23",
  "PSModulePath": "D:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules\\;d:\\Program Files\\Microsoft Security Client\\MpProvider\\;D:\\Program Files\\Microsoft Message Analyzer\\PowerShell\\",
  "PROCESSOR_ARCHITECTURE": "x86",
  "Path": "D:\\Program Files (x86)\\nodejs\\4.2.3;D:\\Windows\\system32;D:\\Windows;D:\\Windows\\System32\\Wbem;D:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;D:\\Users\\Administrator\\AppData\\Roaming\\npm;D:\\Program Files (x86)\\nodejs\\;d:\\Program Files (x86)\\Microsoft ASP.NET\\ASP.NET Web Pages\\v1.0\\;D:\\Program Files (x86)\\Mercurial\\;D:\\Python27;",
  "CommonProgramFiles(x86)": "D:\\Program Files (x86)\\Common Files",
  "ProgramFiles(x86)": "D:\\Program Files (x86)",
  "PROCESSOR_LEVEL": "6",
  "ProgramFiles": "D:\\Program Files (x86)",
  "USERPROFILE": "D:\\local\\UserProfile",
  "SystemRoot": "D:\\Windows",
  "OS": "Windows_NT",
  "AZURE_JETTY9_CMDLINE": "-Djava.net.preferIPv4Stack=true -Djetty.port=%HTTP_PLATFORM_PORT% -Djetty.base=\"D:\\Program Files (x86)\\jetty-distribution-9.1.0.v20131115\" -Djetty.webapps=\"d:\\home\\site\\wwwroot\\webapps\"  -jar \"D:\\Program Files (x86)\\jetty-distribution-9.1.0.v20131115\\start.jar\" etc\\jetty-logging.xml",
  "SystemDrive": "D:",
  "AZURE_TOMCAT8_CMDLINE": "-Dport.http=%HTTP_PLATFORM_PORT% -Djava.util.logging.config.file=\"D:\\Program Files (x86)\\apache-tomcat-8.0.23\\conf\\logging.properties\" -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Dsite.logdir=\"d:/home/LogFiles/\" -Dsite.tempdir=\"d:\\home\\site\\workdir\" -classpath \"D:\\Program Files (x86)\\apache-tomcat-8.0.23\\bin\\bootstrap.jar;D:\\Program Files (x86)\\apache-tomcat-8.0.23\\bin\\tomcat-juli.jar\" -Dcatalina.base=\"D:\\Program Files (x86)\\apache-tomcat-8.0.23\"  -Djava.io.tmpdir=\"d:\\home\\site\\workdir\" org.apache.catalina.startup.Bootstrap",
  "FP_NO_HOST_CHECK": "NO",
  "APPDATA": "D:\\local\\AppData",
  "PROCESSOR_REVISION": "2d07",
  "USERNAME": "RD000D3A208C7E$",
  "CommonProgramW6432": "D:\\Program Files\\Common Files",
  "AZURE_TOMCAT7_HOME": "D:\\Program Files (x86)\\apache-tomcat-7.0.50",
  "CommonProgramFiles": "D:\\Program Files (x86)\\Common Files",
  "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.PY",
  "PROCESSOR_IDENTIFIER": "Intel64 Family 6 Model 45 Stepping 7, GenuineIntel",
  "ComSpec": "D:\\Windows\\system32\\cmd.exe",
  "AZURE_JETTY9_HOME": "D:\\Program Files (x86)\\jetty-distribution-9.1.0.v20131115",
  "ALLUSERSPROFILE": "D:\\local\\ProgramData",
  "TEMP": "D:\\local\\Temp",
  "NUMBER_OF_PROCESSORS": "4",
  "AZURE_TOMCAT7_CMDLINE": "-Dport.http=%HTTP_PLATFORM_PORT% -Djava.util.logging.config.file=\"D:\\Program Files (x86)\\apache-tomcat-7.0.50\\conf\\logging.properties\" -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Dsite.logdir=\"d:/home/LogFiles/\" -Dsite.tempdir=\"d:\\home\\site\\workdir\" -classpath \"D:\\Program Files (x86)\\apache-tomcat-7.0.50\\bin\\bootstrap.jar;D:\\Program Files (x86)\\apache-tomcat-7.0.50\\bin\\tomcat-juli.jar\" -Dcatalina.base=\"D:\\Program Files (x86)\\apache-tomcat-7.0.50\"  -Djava.io.tmpdir=\"d:\\home\\site\\workdir\" org.apache.catalina.startup.Bootstrap",
  "TMP": "D:\\local\\Temp",
  "ProgramData": "D:\\local\\ProgramData",
  "ProgramW6432": "D:\\Program Files",
  "windir": "D:\\Windows",
  "USERDOMAIN": "WORKGROUP",
  "WEBSITE_NODE_DEFAULT_VERSION": "4.2.3",
  "APPSETTING_WEBSITE_NODE_DEFAULT_VERSION": "4.2.3",
  "ScmType": "LocalGit",
  "APPSETTING_ScmType": "LocalGit",
  "WEBSITE_SITE_NAME": "azuredefaultvars",
  "APPSETTING_WEBSITE_SITE_NAME": "azuredefaultvars",
  "WEBSITE_AUTH_ENABLED": "False",
  "APPSETTING_WEBSITE_AUTH_ENABLED": "False",
  "REMOTEDEBUGGINGVERSION": "11.0.611103.400",
  "APPSETTING_REMOTEDEBUGGINGVERSION": "11.0.611103.400",
  "REGION_NAME": "West Europe",
  "HOME": "D:\\home",
  "HOME_EXPANDED": "C:\\DWASFiles\\Sites\\azuredefaultvars\\VirtualDirectory0",
  "LOCAL_EXPANDED": "C:\\DWASFiles\\Sites\\azuredefaultvars",
  "windows_tracing_flags": "",
  "windows_tracing_logfile": "",
  "WEBSITE_INSTANCE_ID": "366f7dfd1043d679afd589a64d86d39e1b8119e173a75ac64b746d5a9f75440f",
  "WEBSITE_HTTPLOGGING_ENABLED": "0",
  "WEBSITE_SCM_ALWAYS_ON_ENABLED": "0",
  "WEBSITE_COMPUTE_MODE": "Shared",
  "WEBSITE_SITE_MODE": "Limited",
  "WEBSITE_SKU": "Free",
  "WEBSITE_SCM_SEPARATE_STATUS": "1",
  "WEBSITE_IIS_SITE_NAME": "azuredefaultvars",
  "REWRITETABLE": "",
  "SITE_BITNESS": "x86",
  "REMOTEDEBUGGINGPORT": "",
  "REMOTEDEBUGGINGBITVERSION": "vx86",
  "WEBSITE_LOCALCACHE_ENABLED": "False",
  "WEBSOCKET_CONCURRENT_REQUEST_LIMIT": "5",
  "JAVA_HOME": "D:\\Program Files\\Java\\jdk1.7.0_51",
  "WEBSITE_OWNER_NAME": "da7fb926-7e39-4e39-a02f-2cba916dbfb6+blazejewicz-apps-WestEuropewebspace",
  "WEBSITE_HOSTNAME": "azuredefaultvars.azurewebsites.net",
  "WEBSITE_VOLUME_TYPE": "PrimaryStorageVolume",
  "PORT": "\\\\.\\pipe\\81fcd657-731f-47ff-b518-7c34f83dacb5",
  "IISNODE_VERSION": "0.2.20",
  "NODE_PENDING_PIPE_INSTANCES": "50",
  "aspnet": {
    "PortableCompilationOutput": "true",
    "PortableCompilationOutputSnapshotType": "Microsoft.Web.Compilation.Snapshots.SnapshotHelper, Microsoft.Web.Compilation.Snapshots, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35",
    "DisableFcnDaclRead": "true"
  },
  "NODE_ENV": "production"
}
```

### Web Job

TBD


## Author
@peterblazejewicz
