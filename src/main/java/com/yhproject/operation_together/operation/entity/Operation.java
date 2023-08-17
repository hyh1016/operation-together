package com.yhproject.operation_together.operation.entity;

import com.yhproject.operation_together.common.entity.BaseTimeEntity;
import com.yhproject.operation_together.input.entity.Input;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Operation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 15, nullable = false)
    private String password;

    @Column(length = 50, nullable = false, unique = true)
    private String link;

    @Column(nullable = false)
    private LocalDate operationDate;


    @OneToMany(mappedBy = "operation")
    private List<Input> inputs;

    @Builder
    private Operation(String name, String password, String link, LocalDate operationDate) {
        this.name = name;
        this.password = password;
        this.link = link;
        this.operationDate = operationDate;
    }
}
