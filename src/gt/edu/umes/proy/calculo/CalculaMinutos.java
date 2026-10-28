package gt.edu.umes.proy.calculo;

public class CalculaMinutos {

    public static void main(String[] args) {
        try {
            long totalSegundos = LogicaDelNegocio.calcularSegundos(args);
            System.out.println("Total en segundos: " + totalSegundos);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}