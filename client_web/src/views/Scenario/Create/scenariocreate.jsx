import React, { useEffect, useState } from "react";
import "../../../styles/style.css";
import "../../../styles/scenariocreate.css";
import MainNavbar from "../../../components/mainNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

function CreateScenario(
  selectedServiceAction,
  selectedServiceReaction,
  selectedServiceActionName,
  selectedServiceReactionName,
  listActions,
  listReactions,
  actionFields,
  actionIngredients,
  reactionFields
) {
  actionFields = actionFields.map((field) => {
    return { name: field.name, value: field.value };
  });

  reactionFields = reactionFields.map((field) => {
    return { name: field.name, value: field.value };
  });

  let actionDescription = "";
  let reactionDescription = "";

  for (let i = 0; i < listActions.length; i++) {
    if (listActions[i].name === selectedServiceActionName) {
      actionDescription = listActions[i].description;
    }
  }

  for (let i = 0; i < listReactions.length; i++) {
    if (listReactions[i].name === selectedServiceReactionName) {
      reactionDescription = listReactions[i].description;
    }
  }

  const data = {
    name: document.getElementById("scenarioName").value,
    trigger: {
      name: selectedServiceActionName,
      serviceName: selectedServiceAction,
      description: actionDescription,
      fields: actionFields,
      ingredients: actionIngredients,
    },
    reaction: {
      name: selectedServiceReactionName,
      serviceName: selectedServiceReaction,
      description: reactionDescription,
      fields: reactionFields,
    },
  };

  fetch("https://api.automateme.fr/scenarios/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default function ScenarioPage() {
  const [services, setServices] = useState([]);
  const [servicesReaction, setServicesReaction] = useState([]);


  function setAvailableServices() {
    fetch("https://api.automateme.fr/subscriptions", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let serviceArray = [];
        let serviceReactionArray = [];
        let services = data.data.map((item) => item.serviceName);
        services.map((service) => {
          if (service === "Twitter") {
            serviceArray.push([
              "Twitter",
              "#1DA1F2",
              `<svg width="69" height="57" viewBox="0 0 69 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_390_772)">
                <path d="M61.7522 14.3311C61.7939 14.9374 61.7939 15.5437 61.7939 16.1557C61.7939 34.8008 47.6601 56.3043 21.8157 56.3043V56.2932C14.1811 56.3043 6.70521 54.1082 0.278198 49.9673C1.38832 50.1014 2.504 50.1685 3.62247 50.1712C9.94933 50.1768 16.0953 48.0449 21.0728 44.1192C15.0603 44.0046 9.78796 40.0677 7.9461 34.3202C10.0523 34.7282 12.2224 34.6443 14.2896 34.0771C7.73465 32.7471 3.01872 26.9633 3.01872 20.2462V20.0674C4.97187 21.1599 7.15872 21.7662 9.39566 21.8333C3.22183 17.6896 1.31876 9.4414 5.04699 2.99257C12.1807 11.808 22.706 17.1671 34.0047 17.7343C32.8724 12.8335 34.4193 7.69787 38.0696 4.25272C43.7287 -1.08963 52.6292 -0.81581 57.9488 4.86463C61.0956 4.24154 64.1115 3.08198 66.8715 1.43904C65.8226 4.70537 63.6274 7.47993 60.6949 9.24301C63.48 8.91331 66.201 8.16448 68.7635 7.02169C66.8771 9.86051 64.5011 12.3333 61.7522 14.3311Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_390_772">
                <rect width="69" height="57" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                
              `,
              "twitter",
            ]);
            serviceReactionArray.push([
              "Twitter",
              "#1DA1F2",
              `<svg width="69" height="57" viewBox="0 0 69 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_390_772)">
                <path d="M61.7522 14.3311C61.7939 14.9374 61.7939 15.5437 61.7939 16.1557C61.7939 34.8008 47.6601 56.3043 21.8157 56.3043V56.2932C14.1811 56.3043 6.70521 54.1082 0.278198 49.9673C1.38832 50.1014 2.504 50.1685 3.62247 50.1712C9.94933 50.1768 16.0953 48.0449 21.0728 44.1192C15.0603 44.0046 9.78796 40.0677 7.9461 34.3202C10.0523 34.7282 12.2224 34.6443 14.2896 34.0771C7.73465 32.7471 3.01872 26.9633 3.01872 20.2462V20.0674C4.97187 21.1599 7.15872 21.7662 9.39566 21.8333C3.22183 17.6896 1.31876 9.4414 5.04699 2.99257C12.1807 11.808 22.706 17.1671 34.0047 17.7343C32.8724 12.8335 34.4193 7.69787 38.0696 4.25272C43.7287 -1.08963 52.6292 -0.81581 57.9488 4.86463C61.0956 4.24154 64.1115 3.08198 66.8715 1.43904C65.8226 4.70537 63.6274 7.47993 60.6949 9.24301C63.48 8.91331 66.201 8.16448 68.7635 7.02169C66.8771 9.86051 64.5011 12.3333 61.7522 14.3311Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_390_772">
                <rect width="69" height="57" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                
              `,
              "twitter",
            ]);
          }
          if (service === "Github") {
            serviceArray.push([
              "Github",
              "#000000",
              `<svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_390_751)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.4091 0C13.5937 0 0 13.75 0 30.7606C0 44.3581 8.70993 55.8681 20.7929 59.9419C22.3036 60.2481 22.8569 59.28 22.8569 58.4656C22.8569 57.7525 22.8072 55.3081 22.8072 52.7612C14.3481 54.595 12.5865 49.0944 12.5865 49.0944C11.2271 45.5294 9.21287 44.6131 9.21287 44.6131C6.44421 42.7287 9.41454 42.7287 9.41454 42.7287C12.4857 42.9325 14.0972 45.8862 14.0972 45.8862C16.8155 50.5712 21.1956 49.2475 22.9578 48.4325C23.2093 46.4462 24.0153 45.0712 24.8712 44.3075C18.1245 43.5944 11.0261 40.9462 11.0261 29.1306C11.0261 25.7694 12.2336 23.0194 14.147 20.8806C13.8451 20.1169 12.7876 16.9587 14.4495 12.7319C14.4495 12.7319 17.0171 11.9169 22.8065 15.8894C25.2852 15.216 27.8414 14.8735 30.4091 14.8706C32.9767 14.8706 35.5941 15.2275 38.0111 15.8894C43.8011 11.9169 46.3687 12.7319 46.3687 12.7319C48.0307 16.9587 46.9725 20.1169 46.6706 20.8806C48.6344 23.0194 49.7922 25.7694 49.7922 29.1306C49.7922 40.9462 42.6938 43.5431 35.8966 44.3075C37.0046 45.275 37.9607 47.1081 37.9607 50.0112C37.9607 54.1362 37.9109 57.4469 37.9109 58.465C37.9109 59.28 38.4649 60.2481 39.9749 59.9425C52.0579 55.8675 60.7678 44.3581 60.7678 30.7606C60.8176 13.75 47.1742 0 30.4091 0Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_390_751">
                <rect width="61" height="60" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                
              `,
              "github",
            ]);
            serviceReactionArray.push([
              "Github",
              "#000000",
              `<svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_390_751)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.4091 0C13.5937 0 0 13.75 0 30.7606C0 44.3581 8.70993 55.8681 20.7929 59.9419C22.3036 60.2481 22.8569 59.28 22.8569 58.4656C22.8569 57.7525 22.8072 55.3081 22.8072 52.7612C14.3481 54.595 12.5865 49.0944 12.5865 49.0944C11.2271 45.5294 9.21287 44.6131 9.21287 44.6131C6.44421 42.7287 9.41454 42.7287 9.41454 42.7287C12.4857 42.9325 14.0972 45.8862 14.0972 45.8862C16.8155 50.5712 21.1956 49.2475 22.9578 48.4325C23.2093 46.4462 24.0153 45.0712 24.8712 44.3075C18.1245 43.5944 11.0261 40.9462 11.0261 29.1306C11.0261 25.7694 12.2336 23.0194 14.147 20.8806C13.8451 20.1169 12.7876 16.9587 14.4495 12.7319C14.4495 12.7319 17.0171 11.9169 22.8065 15.8894C25.2852 15.216 27.8414 14.8735 30.4091 14.8706C32.9767 14.8706 35.5941 15.2275 38.0111 15.8894C43.8011 11.9169 46.3687 12.7319 46.3687 12.7319C48.0307 16.9587 46.9725 20.1169 46.6706 20.8806C48.6344 23.0194 49.7922 25.7694 49.7922 29.1306C49.7922 40.9462 42.6938 43.5431 35.8966 44.3075C37.0046 45.275 37.9607 47.1081 37.9607 50.0112C37.9607 54.1362 37.9109 57.4469 37.9109 58.465C37.9109 59.28 38.4649 60.2481 39.9749 59.9425C52.0579 55.8675 60.7678 44.3581 60.7678 30.7606C60.8176 13.75 47.1742 0 30.4091 0Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_390_751">
                <rect width="61" height="60" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                
              `,
              "github",
            ]);
          }
          if (service === "Spotify") {
            serviceArray.push([
              "Spotify",
              "#1ED760",
              `<svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.4985 0.107178C14.6045 0.107178 0.0978851 14.6134 0.0978851 32.5074C0.0978851 50.4021 14.6045 64.9072 32.4985 64.9072C50.3943 64.9072 64.8994 50.4021 64.8994 32.5074C64.8994 14.6146 50.3943 0.108725 32.4981 0.108725L32.4985 0.107178ZM47.3571 46.8375C46.7768 47.7893 45.5309 48.0911 44.5792 47.5069C36.9718 42.8602 27.3952 41.8078 16.1169 44.3846C15.0301 44.6322 13.9468 43.9512 13.6991 42.864C13.4504 41.7768 14.1286 40.6935 15.2181 40.4459C27.5604 37.625 38.1473 38.8402 46.6878 44.0596C47.6396 44.6438 47.9414 45.8858 47.3571 46.8375ZM51.3229 38.0142C50.5917 39.2039 49.0363 39.5792 47.8485 38.848C39.1393 33.4936 25.8634 31.9433 15.5621 35.0702C14.2261 35.4738 12.8151 34.7208 12.4096 33.3872C12.0072 32.0512 12.7605 30.6429 14.0942 30.2366C25.8611 26.6663 40.4896 28.3957 50.4911 34.5417C51.6789 35.273 52.0542 36.8279 51.3229 38.0142ZM51.6634 28.8275C41.2208 22.625 23.992 22.0547 14.0218 25.0807C12.4208 25.5663 10.7277 24.6625 10.2425 23.0615C9.75735 21.4597 10.6604 19.7677 12.2626 19.281C23.7076 15.8066 42.7336 16.4779 54.7563 23.6151C56.1995 24.4698 56.6715 26.3296 55.8164 27.7678C54.9652 29.2078 53.1003 29.6826 51.6649 28.8275H51.6634Z"
                    fill="white"
                  />
                </svg>`,
              "spotify",
            ]);
            serviceReactionArray.push([
              "Spotify",
              "#1ED760",
              `<svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.4985 0.107178C14.6045 0.107178 0.0978851 14.6134 0.0978851 32.5074C0.0978851 50.4021 14.6045 64.9072 32.4985 64.9072C50.3943 64.9072 64.8994 50.4021 64.8994 32.5074C64.8994 14.6146 50.3943 0.108725 32.4981 0.108725L32.4985 0.107178ZM47.3571 46.8375C46.7768 47.7893 45.5309 48.0911 44.5792 47.5069C36.9718 42.8602 27.3952 41.8078 16.1169 44.3846C15.0301 44.6322 13.9468 43.9512 13.6991 42.864C13.4504 41.7768 14.1286 40.6935 15.2181 40.4459C27.5604 37.625 38.1473 38.8402 46.6878 44.0596C47.6396 44.6438 47.9414 45.8858 47.3571 46.8375ZM51.3229 38.0142C50.5917 39.2039 49.0363 39.5792 47.8485 38.848C39.1393 33.4936 25.8634 31.9433 15.5621 35.0702C14.2261 35.4738 12.8151 34.7208 12.4096 33.3872C12.0072 32.0512 12.7605 30.6429 14.0942 30.2366C25.8611 26.6663 40.4896 28.3957 50.4911 34.5417C51.6789 35.273 52.0542 36.8279 51.3229 38.0142ZM51.6634 28.8275C41.2208 22.625 23.992 22.0547 14.0218 25.0807C12.4208 25.5663 10.7277 24.6625 10.2425 23.0615C9.75735 21.4597 10.6604 19.7677 12.2626 19.281C23.7076 15.8066 42.7336 16.4779 54.7563 23.6151C56.1995 24.4698 56.6715 26.3296 55.8164 27.7678C54.9652 29.2078 53.1003 29.6826 51.6649 28.8275H51.6634Z"
                    fill="white"
                  />
                </svg>`,
              "spotify",
            ]);
          }
          if (service === "Twitch") {
            serviceArray.push([
              "Twitch",
              "#9146FF",
              `<svg width="56" height="65" viewBox="0 0 56 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6667 0L0 11.6071V53.3929H14V65L25.6667 53.3929H35L56 32.5V0H11.6667ZM51.3333 30.1786L42 39.4643H32.6667L24.5 47.5893V39.4643H14V4.64286H51.3333V30.1786Z" fill="white"/>
              <path d="M44.3333 12.7678H39.6667V26.6964H44.3333V12.7678Z" fill="white"/>
              <path d="M31.5 12.7678H26.8333V26.6964H31.5V12.7678Z" fill="white"/>
              </svg>
              `,
              "twitch",
            ]);
            serviceReactionArray.push([
              "Twitch",
              "#9146FF",
              `<svg width="56" height="65" viewBox="0 0 56 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6667 0L0 11.6071V53.3929H14V65L25.6667 53.3929H35L56 32.5V0H11.6667ZM51.3333 30.1786L42 39.4643H32.6667L24.5 47.5893V39.4643H14V4.64286H51.3333V30.1786Z" fill="white"/>
              <path d="M44.3333 12.7678H39.6667V26.6964H44.3333V12.7678Z" fill="white"/>
              <path d="M31.5 12.7678H26.8333V26.6964H31.5V12.7678Z" fill="white"/>
              </svg>
              `,
              "twitch",
            ]);
          }
          if (service === "Discord") {
            /*serviceArray.push([
              "Discord",
              "#5865F2",
              `<svg width="76" height="59" viewBox="0 0 76 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M64.3372 4.94019C59.4932 2.70806 54.2988 1.06352 48.8677 0.121627C48.7688 0.103449 48.67 0.148878 48.619 0.239737C47.951 1.433 47.211 2.98971 46.6928 4.21327C40.8513 3.335 35.0397 3.335 29.318 4.21327C28.7997 2.96251 28.0329 1.433 27.3618 0.239737C27.3109 0.15191 27.2121 0.10648 27.1132 0.121627C21.685 1.06051 16.4906 2.70505 11.6436 4.94019C11.6017 4.95835 11.5657 4.98867 11.5418 5.02801C1.68907 19.8108 -1.01001 34.2302 0.31407 48.4708C0.320062 48.5405 0.359005 48.6071 0.412927 48.6495C6.9135 53.4438 13.2104 56.3543 19.3904 58.2835C19.4893 58.3138 19.5941 58.2775 19.657 58.1957C21.1189 56.1908 22.422 54.0768 23.5393 51.8537C23.6053 51.7235 23.5423 51.5691 23.4076 51.5176C21.3406 50.7301 19.3724 49.7701 17.4791 48.6798C17.3294 48.592 17.3174 48.3768 17.4552 48.2739C17.8536 47.974 18.2521 47.6621 18.6325 47.3471C18.7014 47.2896 18.7973 47.2774 18.8782 47.3138C31.3161 53.0168 44.7816 53.0168 57.0727 47.3138C57.1536 47.2744 57.2495 47.2866 57.3213 47.3441C57.7019 47.6591 58.1003 47.974 58.5017 48.2739C58.6395 48.3768 58.6305 48.592 58.4807 48.6798C56.5875 49.7912 54.6193 50.7301 52.5493 51.5146C52.4145 51.5661 52.3546 51.7235 52.4205 51.8537C53.5618 54.0737 54.8649 56.1877 56.2998 58.1927C56.3598 58.2775 56.4676 58.3138 56.5665 58.2835C62.7764 56.3543 69.0733 53.4438 75.5739 48.6495C75.6308 48.6071 75.6668 48.5435 75.6728 48.4738C77.2574 32.0101 73.0186 17.7089 64.436 5.03102C64.415 4.98867 64.3792 4.95835 64.3372 4.94019ZM25.3967 39.7997C21.6521 39.7997 18.5666 36.3472 18.5666 32.107C18.5666 27.8669 21.5922 24.4143 25.3967 24.4143C29.2311 24.4143 32.2867 27.8972 32.2268 32.107C32.2268 36.3472 29.2011 39.7997 25.3967 39.7997ZM50.65 39.7997C46.9055 39.7997 43.82 36.3472 43.82 32.107C43.82 27.8669 46.8455 24.4143 50.65 24.4143C54.4845 24.4143 57.54 27.8972 57.4802 32.107C57.4802 36.3472 54.4845 39.7997 50.65 39.7997Z" fill="white"/>
              </svg>
              `,
              "discord",
            ]);*/
            serviceReactionArray.push([
              "Discord",
              "#5865F2",
              `<svg width="76" height="59" viewBox="0 0 76 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M64.3372 4.94019C59.4932 2.70806 54.2988 1.06352 48.8677 0.121627C48.7688 0.103449 48.67 0.148878 48.619 0.239737C47.951 1.433 47.211 2.98971 46.6928 4.21327C40.8513 3.335 35.0397 3.335 29.318 4.21327C28.7997 2.96251 28.0329 1.433 27.3618 0.239737C27.3109 0.15191 27.2121 0.10648 27.1132 0.121627C21.685 1.06051 16.4906 2.70505 11.6436 4.94019C11.6017 4.95835 11.5657 4.98867 11.5418 5.02801C1.68907 19.8108 -1.01001 34.2302 0.31407 48.4708C0.320062 48.5405 0.359005 48.6071 0.412927 48.6495C6.9135 53.4438 13.2104 56.3543 19.3904 58.2835C19.4893 58.3138 19.5941 58.2775 19.657 58.1957C21.1189 56.1908 22.422 54.0768 23.5393 51.8537C23.6053 51.7235 23.5423 51.5691 23.4076 51.5176C21.3406 50.7301 19.3724 49.7701 17.4791 48.6798C17.3294 48.592 17.3174 48.3768 17.4552 48.2739C17.8536 47.974 18.2521 47.6621 18.6325 47.3471C18.7014 47.2896 18.7973 47.2774 18.8782 47.3138C31.3161 53.0168 44.7816 53.0168 57.0727 47.3138C57.1536 47.2744 57.2495 47.2866 57.3213 47.3441C57.7019 47.6591 58.1003 47.974 58.5017 48.2739C58.6395 48.3768 58.6305 48.592 58.4807 48.6798C56.5875 49.7912 54.6193 50.7301 52.5493 51.5146C52.4145 51.5661 52.3546 51.7235 52.4205 51.8537C53.5618 54.0737 54.8649 56.1877 56.2998 58.1927C56.3598 58.2775 56.4676 58.3138 56.5665 58.2835C62.7764 56.3543 69.0733 53.4438 75.5739 48.6495C75.6308 48.6071 75.6668 48.5435 75.6728 48.4738C77.2574 32.0101 73.0186 17.7089 64.436 5.03102C64.415 4.98867 64.3792 4.95835 64.3372 4.94019ZM25.3967 39.7997C21.6521 39.7997 18.5666 36.3472 18.5666 32.107C18.5666 27.8669 21.5922 24.4143 25.3967 24.4143C29.2311 24.4143 32.2867 27.8972 32.2268 32.107C32.2268 36.3472 29.2011 39.7997 25.3967 39.7997ZM50.65 39.7997C46.9055 39.7997 43.82 36.3472 43.82 32.107C43.82 27.8669 46.8455 24.4143 50.65 24.4143C54.4845 24.4143 57.54 27.8972 57.4802 32.107C57.4802 36.3472 54.4845 39.7997 50.65 39.7997Z" fill="white"/>
              </svg>
              `,
              "discord",
            ]);
          }
        });
        setServices(serviceArray);
        setServicesReaction(serviceReactionArray);
      });
  }

  const [selectedServiceAction, setServiceAction] = useState("");
  const [selectedServiceReaction, setServiceReaction] = useState("");

  const changeSelectedServiceAction = (newService) => {
    setServiceAction(newService);
    getActions(newService);
  };

  const changeSelectedServiceReaction = (newService) => {
    setServiceReaction(newService);
    getReactions(newService);
  };

  const [listActions, setListAction] = useState([]);
  const [listFieldsAction, setListFieldAction] = useState([]);
  const [listParamsAction, setListParamAction] = useState([]);

  const [listReactions, setListReaction] = useState([]);
  const [listFieldsReaction, setListFieldReaction] = useState([]);

  const [fieldAction, setFieldAction] = useState([]);
  const [paramAction, setParamAction] = useState([]);

  const [fieldReaction, setFieldReaction] = useState([]);

  function getActions(selectedServiceAction) {
    fetch(`https://api.automateme.fr/services/${selectedServiceAction}/triggers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let actionList = data.map((elem) => {
          return {
            name: elem.name,
            serviceName: elem.serviceName,
            description: elem.description,
          };
        });
        let fieldsList = data.map((item) => item.fields || []);
        let ingredientsList = data.map((item) => item.ingredients || []);

        setListAction(actionList);
        setListFieldAction(fieldsList);
        setListParamAction(ingredientsList);
        setFieldAction(fieldsList[0]);
        setParamAction(ingredientsList[0]);
        setServiceActionName(actionList[0].name);
      });
  }

  function getReactions(selectedServiceReaction) {
    fetch(
      `https://api.automateme.fr/services/${selectedServiceReaction}/reactions`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let reactionList = data.map((elem) => {
          return {
            name: elem.name,
            serviceName: elem.serviceName,
            description: elem.description,
          };
        });

        let fieldsList = data.map((item) => item.fields || []);

        setListReaction(reactionList);
        setListFieldReaction(fieldsList);
        setFieldReaction(fieldsList[0]);
        setServiceReactionName(reactionList[0].name);
      });
  }

  function changeParamAction(ingredientsList, index) {
    setParamAction(ingredientsList[index]);
  }

  function changeFieldAction(fieldList, index) {
    setFieldAction(fieldList[index]);
  }

  function changeFieldReaction(fieldList, index) {
    setFieldReaction(fieldList[index]);
  }

  const handleTextFieldChangeParamAction = (index, value) => {
    const newParamAction = [...paramAction];
    newParamAction[index].value = value;
    setParamAction(newParamAction);
  };

  const handleTextFieldChangeFieldAction = (index, value) => {
    const newFieldAction = [...fieldAction];
    newFieldAction[index].value = value;
    setFieldAction(newFieldAction);
    console.log(fieldAction);
  };

  const handleTextFieldChangeFieldReaction = (index, value) => {
    const newFieldReaction = [...fieldReaction];
    newFieldReaction[index].value = value;
    setFieldReaction(newFieldReaction);
  };

  const [reactionState, setReactionState] = React.useState(listReactions[0]);

  const [selectedServiceActionName, setServiceActionName] = useState("");
  const [selectedServiceReactionName, setServiceReactionName] = useState("");

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionName = e.target.value;
    setServiceActionName(selectedOptionName);
    changeParamAction(listParamsAction, selectedIndex);
    changeFieldAction(listFieldsAction, selectedIndex);
  };

  const handleSelectChangeTwo = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionName = e.target.value;
    setServiceReactionName(selectedOptionName);
    changeFieldReaction(listFieldsReaction, selectedIndex);
  };
  useEffect(() => {
    setAvailableServices();
    document.body.style.backgroundColor = "#222222";
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      getActions(services[0][0]);
      getReactions(services[0][0]);
      setServiceAction(services[0][0]);
      setServiceReaction(services[0][0]);
    }
  }, [services]);
  return (
    <div className="PageStyle">
      <MainNavbar />
      <div className="ScenarioTitle">Scénario</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "2%" }}>
          <Typography
            style={{
              color: "white",
              fontWeight: 600,
              marginBottom: "2%",
              textAlign: "center",
            }}
          >
            Name
          </Typography>
          <TextField
            id="scenarioName"
            variant="outlined"
            color="primary"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "16px",
                backgroundColor: "#fff",
                border: "none",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              },
            }}
            InputLabelProps={{
              style: { display: "none" },
            }}
          />
        </div>
      </div>

      <div className="divServicesCardsCreate">
        {services.map((service, index) => (
          <Link style={{ textDecoration: "none", marginLeft: "1%" }}>
            <Card
              sx={{
                width: 120,
                marginLeft: "4%",
                height: 120,
                backgroundColor: service[1],
                borderRadius: "39px",
              }}
              onClick={() => changeSelectedServiceAction(service[0])}
            >
              <CardMedia
                sx={{
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="service media"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: service[2] }} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div>
        <select onChange={handleSelectChange}>
          {listActions.map((option) => (
            <option key={option.name}>{option.name}</option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {fieldAction.map((param, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              marginTop: "4%",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontWeight: 600,
                marginBottom: "2%",
              }}
            >
              {param.name}
            </Typography>
            <TextField
              value={param.value}
              onChange={(event) =>
                handleTextFieldChangeFieldAction(index, event.target.value)
              }
              variant="outlined"
              color="primary"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  border: "none",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                },
              }}
              InputLabelProps={{
                style: { display: "none" },
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "5%" }}>
        {paramAction.map((param, index) => (
          <Chip
            key={index}
            label={param.name}
            variant="outlined"
            style={{
              margin: "4px",
              backgroundColor: "white",
            }}
          />
        ))}
      </div>
      <div className="divServicesCardsCreate">
        {servicesReaction.map((service, index) => (
          <Link style={{ textDecoration: "none", marginLeft: "1%" }}>
            <Card
              sx={{
                width: 120,
                marginLeft: "4%",
                height: 120,
                backgroundColor: service[1],
                borderRadius: "39px",
              }}
              onClick={() => changeSelectedServiceReaction(service[0])}
            >
              <CardMedia
                sx={{
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="service media"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: service[2] }} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div>
        <select onChange={handleSelectChangeTwo}>
          {listReactions.map((option) => (
            <option key={option.name}>{option.name}</option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {fieldReaction.map((param, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              marginTop: "4%",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontWeight: 600,
                marginBottom: "2%",
              }}
            >
              {param.name}
            </Typography>
            <TextField
              value={param.value}
              onChange={(event) =>
                handleTextFieldChangeFieldReaction(index, event.target.value)
              }
              variant="outlined"
              color="primary"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  border: "none",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                },
              }}
              InputLabelProps={{
                style: { display: "none" },
              }}
            />
          </div>
        ))}
      </div>

      <div>
        <Button
          style={{
            color: "black",
            borderRadius: "50px",
            backgroundColor: "white",
            marginTop: "15%",
          }}
          onClick={() =>
            CreateScenario(
              selectedServiceAction,
              selectedServiceReaction,
              selectedServiceActionName,
              selectedServiceReactionName,
              listActions,
              listReactions,
              fieldAction,
              paramAction,
              fieldReaction
            )
          }
        >
          Créer
        </Button>
      </div>
    </div>
  );
}
