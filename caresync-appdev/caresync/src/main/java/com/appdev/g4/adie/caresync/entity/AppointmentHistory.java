package com.appdev.g4.adie.caresync.entity;

package com.appdev.g4.projectCareSync.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class AppointmentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate historyDate;
    private String reasons;
    private String status;
    private String results;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getHistoryDate() { return historyDate; }
    public void setHistoryDate(LocalDate historyDate) { this.historyDate = historyDate; }

    public String getReasons() { return reasons; }
    public void setReasons(String reasons) { this.reasons = reasons; }

    public String getStatus() { 
    	return status; 
    }
    public void setStatus(String status) { this.status = status; }

    public String getResults() { return results; }
    public void setResults(String results) { this.results = results; }
}