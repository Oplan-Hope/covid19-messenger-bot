const api = require("../utils/api");

const handlePostback = async (postback, profile, messageSender) => {
  switch (postback.payload) {
    case "GET_STARTED":
      messageSender
        .setMessage({
          text: `Hello ${profile.first_name || "my friend"}! How can I help?`
        })
        .send();
      break;

    case "QUICK_UPDATE":
      messageSender
        .setMessage({
          text: `Hi ${profile.first_name} how can I help you?`,
          quick_replies: [
            {
              content_type: "text",
              title: "Hospital near me",
              payload: "HNM",
              image_url:
                "https://cdn3.iconfinder.com/data/icons/small-color-v11/512/blood_drop_hospital_infusion_medical_transfusion-512.png"
            },
            {
              content_type: "text",
              title: "Checkpoints near me",
              payload: "CNM",
              image_url:
                "https://image.shutterstock.com/image-vector/road-closed-street-barrier-on-260nw-1212098479.jpg"
            }
          ]
        })
        .send();
      break;

    case "SEARCH":
      messageSender;
      messageSender
        .setMessage({
          text: `Hey, as I can see, you are curious about how many cases of COVID-19 we have right now. Which you wanna check?`,
          quick_replies: [
            {
              content_type: "text",
              title: "COVID19 cases around the world",
              payload: "CATW",
              image_url:
                "https://i.pinimg.com/originals/dd/d5/0c/ddd50c7fd01a3a3927b932d8a5d4857c.png"
            },
            {
              content_type: "text",
              title: "COVID19 cases per location",
              payload: "SCS",
              image_url:
                "https://png.pngtree.com/element_our/png_detail/20181206/find-vector-icon-png_260845.jpg"
            }
          ]
        })
        .send();
      break;

    case "RESOURCES":
      messageSender
        .setMessage({
          text: `Hey, don't worry. Earth is just healing itself from humanities. For the meantime, here's the list of things we can do for you.`,
          quick_replies: [
            {
              content_type: "text",
              title: "What is COVID19",
              payload: "R-WIC"
            },
            {
              content_type: "text",
              title: "What should I do",
              payload: "R-WSD"
            },
            {
              content_type: "text",
              title: "COVID19 MAP",
              payload: "R-CM"
            },
            {
              content_type: "text",
              title: "COVID19 Tweets",
              payload: "R-CT"
            }
          ]
        })
        .send();
      break;
  }
};

const handleMessage = async (message, profile, messageSender) => {
  if (message.quick_reply) {
    const { payload } = message.quick_reply;

    console.log(payload);

    switch (payload) {
      case "R-WIC":
        messageSender
          .setMessage({
            text:
              `A pneumonia of unknown cause detected in Wuhan, China was first reported to the WHO Country Office in China on 31 December 2019 \n` +
              `WHO is working 24/7 to analyse data, provide advice, coordinate with partners, help countries prepare, increase supplies and manage expert networks.\n` +
              `The outbreak was declared a Public Health Emergency of International Concern on 30 January 2020..\n` +
              `The international community has asked for US$675 million to help protect states with weaker health systems as part of its Strategic Preparedness and Response Plan...\n` +
              `The international community has asked for US$675 million to help protect states with weaker health systems as part of its Strategic Preparedness and Response Plan...\n` +
              `On 11 February 2020, WHO announced a name for the new coronavirus disease: COVID-19.`
          })
          .send();
        break;
      case "R-WSD":
        messageSender
          .setMessage({
            text:
              `Hey ${
                profile.first_name ? profile.first_name : ""
              }, soon things will be brighter. Stay strong!\n ` +
              `-For the mean time, here's what you should do to help yourself stay awared.\n` +
              `-Wash your hands frequently\n ` +
              `-Maintain social distancing\n ` +
              `-Avoid touching eyes, nose and mouth \n` +
              `-Practice respiratory hygiene\n ` +
              `-If you have fever, cough and difficulty breathing, seek medical care early\n` +
              `-Stay informed and follow advice given by your healthcare provider\n` +
              `-Source: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public\n`
          })
          .send();
        break;

      case "R-CM":
        messageSender
          .setMessage({
            text: `If you want to take a look at the detailed case of the COVID 19 here's the link of the map:https://the2019ncov.com/`
          })
          .send();
        break;

      case "R-CT":
        messageSender
          .setMessage({
            text: `If you want to be stay updated with the latest news and tweets about COVID-19, please check out this link for more info:  https://twitter.com/search?q=%23COVID&src=typed_query`
          })
          .send();
        break;
      case "CATW":
        const statsWorld = await api.worldTotalApi();
        messageSender
          .setMessage({
            text:
              "The world currently have: \n" +
              ` - ${statsWorld.total_cases} reported cases \n` +
              ` - ${statsWorld.total_deaths} deaths \n` +
              ` - ${statsWorld.total_recovered} recovered`
          })
          .send();
        break;
      case "SCS":
        messageSender
          .setMessage({
            text: `"Uhm.. Are you looking for number of cases right now here in the Philippines?"`,
            quick_replies: [
              {
                content_type: "text",
                title: "Yes",
                payload: "PHYES"
              },
              {
                content_type: "text",
                title: "Other location",
                payload: "OTLC",
                image_url:
                  "https://cdn3.iconfinder.com/data/icons/marketing-add-on-colored/48/JD-11-512.png"
              }
            ]
          })
          .send();
        break;

      case "PHYES":
        const phname = "Philippines";
        const statsPH = await api.casesByRegionApi(phname);
        messageSender
          .setMessage({
            text: statsPH
              ? ` ${phname} currently have: \n` +
                ` - ${statsPH.cases} reported cases \n` +
                ` - ${statsPH.deaths} deaths \n` +
                ` - ${statsPH.total_recovered} recovered \n` +
                ` - ${statsPH.new_cases} new cases \n` +
                ` - ${statsPH.new_deaths} new cases \n` +
                `Stay safe ${profile.first_name || "my friend"}!`
              : `Sorry, we can't find your region.`
          })
          .send();
        break;
      case "OTLC":
        messageSender
          .setMessage({
            text:
              'What country or region you are located? Just put a "/" first \n e.g. /China'
          })
          .send();
        break;

      case "HNM":
        console.log("Hospital Near Me");
        break;

      case "CNM":
        messageSender.setMessage({
          text: "Your Location",
          quick_replies: [{ content_type: "location" }]
        });
        console.log("Checkpoint Near me");
        break;

      default:
        messageSender
          .setMessage({
            text: `Sorry I don't understand you stay safe  ${
              profile.first_name ? profile.first_name : "Little Warrior"
            }. To know more about kindly COVID see this link https://www.youtube.com/watch?v=95eNDcugOYU`
          })
          .send();
        break;
    }
  } else if (message.text) {
    if (message.text.startsWith("/")) {
      const searchTerm = message.text.split("/").join("");
      const stats = await api.casesByRegionApi(searchTerm);
      messageSender
        .setMessage({
          text: stats
            ? stats.country_name +
              " currently have: \n" +
              ` - ${stats.cases} reported cases \n` +
              ` - ${stats.deaths} deaths \n` +
              ` - ${stats.total_recovered} recovered \n` +
              ` - ${stats.new_cases} new cases \n` +
              ` - ${stats.new_deaths} new cases \n` +
              `Stay safe ${profile.first_name || "my friend"}!`
            : `Sorry, we can't find your region.`
        })
        .send();
    } else {
      messageSender
        .setMessage({
          text: `Hey, ${
            profile.first_name ? profile.first_name : ""
          }. I can't quite seem to understand what you're trying to say. Please try to use another keyword so I can give you more information. https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public `
        })
        .send();
    }
  }
};





module.exports = {
  handlePostback,
  handleMessage
};
