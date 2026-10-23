package gt.edu.umes.proy.calculo;

public class LogicaDelNegocio {
	public static boolean validarParametros(String[] args) {
        if (args.length != 5) {
            System.out.println("Error: Debe ingresar exactamente 5 parametros (meses semanas dias horas minutos).");
            return false;
        }
        try {
            for (String arg : args) {
                Integer.parseInt(arg);
            }
        } catch (NumberFormatException e) {
            System.out.println("Error: Todos los valores de entrada deben ser numeros enteros.");
            return false;
        }
        return true;
    }

    public static long calcularSegundos(int meses, int semanas, int dias, int horas, int minutos) {
    
        long segMinutos = (long) minutos * 60; //60s
        long segHoras = (long) horas * 3600; //3,600s
        long segDias = (long) dias * 86400; //86,400ss
        long segSemanas = (long) semanas * 7 * 86400; //604,800s
        long segMeses = (long) meses * 30 * 86400; //2,592,000s

        System.out.println("This is a Demo :)");
        return segMeses + segSemanas + segDias + segHoras + segMinutos;
    }

}
