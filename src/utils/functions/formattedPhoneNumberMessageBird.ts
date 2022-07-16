export async function formattedPhoneNumberMessageBird(
  phoneNumberMessageBird: string,
) {
  return phoneNumberMessageBird.split(':')[1];
}
