using ECommerce.Models;
using ECommerce.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


var configValue = builder.Configuration.GetSection(nameof(MongoSettings));
// Add services to the container.
builder.Services.Configure<MongoSettings>(configValue);

builder.Services.AddSingleton<IMongoSettings>(sp =>
    sp.GetRequiredService<IOptions<MongoSettings>>().Value);

builder.Services.AddSingleton<ProductService>();
builder.Services.AddControllers();
const string policyName = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName, builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(policyName);
app.UseAuthorization();

app.MapControllers();

app.Run();
