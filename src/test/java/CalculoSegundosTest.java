package test.java;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import gt.edu.umes.proy.calculo.LogicaDelNegocio;

public class CalculoSegundosTest {

    // 1. Validar que detecte cuando se mandan letras o datos no enteros, usando excepciones
    @Test
    public void testValidarParametrosConLetras() {
        String[] argsInvalidos = {"1", "tres", "6", "20", "1"};
        
        // Verificación que al ejecutar se lance una excepción (NumberFormatException o IllegalArgumentException)
        assertThrows(Exception.class, () -> {
            LogicaDelNegocio.calcularSegundos(argsInvalidos);
        }, "Debería lanzar una excepción al recibir letras en los parámetros.");
    }

    // 2. Validar que calcule bien la cantidad de segundos para los parámetros: 1 3 6 20 1
    @Test
    public void testCalcularSegundosCorrecto() {
        String[] argsValidos = {"1", "3", "6", "20", "1"};
        
        // Cálculo esperado según la lógica:
        // Meses: 1 * 30 * 86400 = 2,592,000
        // Semanas: 3 * 7 * 86400 = 1,814,400
        // Días: 6 * 86400 = 518,400
        // Horas: 20 * 3600 = 72,000
        // Minutos: 1 * 60 = 60
        // Total esperado = 5,000,860
        long resultadoEsperado = 4996860L;
        
        long resultadoReal = LogicaDelNegocio.calcularSegundos(argsValidos);
        
        assertEquals(resultadoEsperado, resultadoReal, "El cálculo de segundos para los parámetros dados no coincide.");
    }
}