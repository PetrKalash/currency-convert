import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/convert")
public class CurrencyConverterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String amountStr = req.getParameter("amount");
        String from = req.getParameter("from");
        String to = req.getParameter("to");

        double amount = Double.parseDouble(amountStr);
        double rate = CurrencyApiService.getExchangeRate(from, to);
        double result = amount * rate;

        resp.setContentType("text/html");
        resp.getWriter().write(String.valueOf(result));
    }
}