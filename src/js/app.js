import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,git
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  let fullName = "";
  if (variables.name || variables.lastName) {
    fullName = `${variables.name || ""} ${variables.lastName || ""}`.trim();
  }

  let location = "";
  if (variables.city || variables.country) {
    location = `${variables.city || ""}${
      variables.city && variables.country ? ", " : ""
    }${variables.country || ""}`;
  }

  let socialMediaLinks = [];

  if (variables.twitter) {
    socialMediaLinks.push(
      `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
    );
  }

  if (variables.github) {
    socialMediaLinks.push(
      `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
    );
  }

  if (variables.linkedin) {
    socialMediaLinks.push(
      `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
    );
  }

  if (variables.instagram) {
    socialMediaLinks.push(
      `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
    );
  }

  let socialMediaBar = "";
  if (socialMediaLinks.length > 0) {
    socialMediaBar = `<ul class="${variables.socialMediaPosition ||
      "position-right"}">
      ${socialMediaLinks.join("\n      ")}
    </ul>`;
  }

  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          ${fullName ? `<h1>${fullName}</h1>` : ""}
          ${variables.role ? `<h2>${variables.role}</h2>` : ""}
          ${location ? `<h3>${location}</h3>` : ""}
          ${socialMediaBar}
        </div>
    `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,

    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",

    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",

    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
