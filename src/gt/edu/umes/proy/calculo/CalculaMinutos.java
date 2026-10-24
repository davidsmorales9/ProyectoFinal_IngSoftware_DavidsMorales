package gt.edu.umes.proy.calculo;

public class CalculaMinutos {

	public static void main(String[] args) {
		
		if (!LogicaDelNegocio.validarParametros(args)) {
            return;
        }

        int meses = Integer.parseInt(args[0]);
        int semanas = Integer.parseInt(args[1]);
        int dias = Integer.parseInt(args[2]);
        int horas = Integer.parseInt(args[3]);
        int minutos = Integer.parseInt(args[4]);

        long totalSegundos = LogicaDelNegocio.calcularSegundos(meses, semanas, dias, horas, minutos);

        System.out.println("Total en segundos: " + totalSegundos);
        
    /*Cambio de prueba 23 de octubre*/

	}

}
