package com.yhproject.operation_together.domain.operation;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import com.yhproject.operation_together.domain.input.Input;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Operation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(length = 20, nullable = false)
    public String name;

    @Column(length = 15, nullable = false)
    public String password;

    @Column(length = 16, nullable = false)
    public String link;

    @Column(nullable = false)
    public LocalDate operationDate;

    @Column(nullable = false)
    public int type;

    @OneToMany(mappedBy = "operation")
    public List<Input> inputs;

    @Builder
    public Operation(String name, String password, String link, LocalDate operationDate, int type) {
        this.name = name;
        this.password = password;
        this.link = link;
        this.operationDate = operationDate;
        this.type = type;
    }
}
