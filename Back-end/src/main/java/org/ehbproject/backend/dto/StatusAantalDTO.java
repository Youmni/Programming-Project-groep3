package org.ehbproject.backend.dto;

public class StatusAantalDTO {

    private String status;
    private int aantal;

    public StatusAantalDTO(String status, int aantal) {
        this.status = status;
        this.aantal = aantal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAantal() {
        return aantal;
    }

    public void setAantal(int aantal) {
        this.aantal = aantal;
    }
}
