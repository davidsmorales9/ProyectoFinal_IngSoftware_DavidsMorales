package gt.edu.umes.proy.calculo;

public class LogicaDelNegocio {

    // Función 1: Disponible para pruebas unitarias de validación
    public static boolean validarParametros(String[] args) {
        if (args == null || args.length != 5) {
            return false;
        }
        try {
            for (String arg : args) {
                Long.parseLong(arg);
            }
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

    // Función 2: Realiza validación interna y cálculo en una sola llamada segura
    public static long calcularSegundos(String[] args) {
        if (!validarParametros(args)) {
            throw new IllegalArgumentException("Error: Debe ingresar exactamente 5 números enteros válidos.");
        }

        long meses = Long.parseLong(args[0]);
        long semanas = Long.parseLong(args[1]);
        long dias = Long.parseLong(args[2]);
        long horas = Long.parseLong(args[3]);
        long minutos = Long.parseLong(args[4]);

        // Ajuste de factores temporales exactos
        long segMinutos = minutos * 60;
        long segHoras = horas * 3600;
        long segDias = dias * 86400;
        long segSemanas = semanas * 604800; // 7 * 86400
        long segMeses = meses * 2592000;   // 30 * 86400

        return segMeses + segSemanas + segDias + segHoras + segMinutos;
    }
}