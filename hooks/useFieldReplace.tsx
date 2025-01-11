export default function useFieldReplace(field: string) {
  switch (field) {
    case "specialists":
      return "specialists";
    case "price-list":
      return "priceList";
    case "reports":
      return "reports";
    case "news":
      return "newsAndTips";
    case "faq":
      return "questionAnswers";
    case "messages":
      return "messages";
    default:
      return "service";
  }
}
