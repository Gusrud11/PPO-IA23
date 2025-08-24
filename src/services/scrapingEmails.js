import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeEmails() {
  const url = "https://camboriu.ifc.edu.br/quadro-docente-2025-1/";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const emails = [];

  $("table.waffle tbody tr").each((i, row) => {
    const cols = $(row).find("td");
    if (cols.length > 0) {
      const nome = $(cols[0]).text().trim();
      const email = $(cols[3]).text().trim();

      if (nome && email) {
        emails.push({ nome, email });
      }
    }
  });

  return emails;
}
